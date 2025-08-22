// ==========================
// Importación de dependencias necesarias
// ==========================
const express = require('express'); // Framework web minimalista para Node.js
const cors = require('cors'); // Middleware para habilitar CORS (intercambio de recursos entre dominios)
const mongoose = require('mongoose'); // ODM para conectar y trabajar con MongoDB de forma orientada a objetos

// ==========================
// Inicialización de la app Express
// ==========================
const app = express();

// ==========================
// Configuración de Middlewares
// ==========================
app.use(cors()); // Permite que clientes de otros orígenes accedan a esta API
app.use(express.json()); // Permite que el servidor reciba JSON en las solicitudes

// ==========================
// Conexión a la base de datos MongoDB
// ==========================
mongoose.connect('mongodb://localhost:27017/ProyectoCRUDMean', {}) // Conecta a la base local llamada ProyectoCRUDMean
    .then(() => console.log(' Conectado a la base de datos ProyectoCRUDMean'))
    .catch((error) => console.error(' Error al conectar con MongoDB:', error));

// ==========================
// Definición del esquema de sucursales
// ==========================
const sucursalSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true, trim: true }, // Campo obligatorio, único y sin espacios extra
    direccion: { type: String, required: true, trim: true },
    ciudad: { type: String, required: true, trim: true },
    telefono: { type: String, trim: true },
    estado: { type: String, enum: ['activa', 'inactiva'], default: 'activa' }, // Solo acepta esos valores
    createdAt: { type: Date, default: Date.now } // Fecha automática de creación
});

// ==========================
// Creación del modelo Mongoose
// ==========================
const Sucursal = mongoose.model('sucursal', sucursalSchema);

// ==========================
// Middleware de autenticación con JWT
// ==========================
function verificarToken(req, res, next) {
  const token = req.headers['authorization']; // Se espera el token en el header "Authorization"
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET); // Verifica la validez del token
    req.usuario = decoded; // Se guarda el contenido del token en la request
    next(); // Continúa con la siguiente función middleware o ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

// ==========================
// GET: Obtener todas las sucursales
// ==========================
app.get('/api/sucursales', verificarToken, async (req, res) => {
    try {
        const sucursales = await Sucursal.find().sort({ createdAt: -1 }); // Ordenadas por fecha descendente
        res.json(sucursales);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ==========================
// POST: Crear nueva sucursal
// ==========================
app.post('/api/sucursales/guardar', async (req, res) => {
    try {
        const { nombre, direccion, ciudad, telefono, estado } = req.body;

        // Validación de campos requeridos
        if (!nombre || !direccion || !ciudad) {
            return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
        }

        // Creación del documento
        const nuevaSucursal = new Sucursal({
            nombre,
            direccion,
            ciudad,
            telefono,
            estado
        });

        const sucursalGuardada = await nuevaSucursal.save(); // Guardar en la BD
        res.status(201).json(sucursalGuardada);
    } catch (error) {
        console.error('Error al crear sucursal:', error);
        if (error.code === 11000) { // Duplicado en campo único
            return res.status(409).json({ message: 'El nombre de la sucursal ya existe' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ==========================
// PUT: Actualizar sucursal existente
// ==========================
app.put('/api/sucursales/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, ciudad, telefono, estado } = req.body;

        if (!nombre || !direccion || !ciudad) {
            return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
        }

        const sucursalActualizada = await Sucursal.findByIdAndUpdate(
            id,
            { nombre, direccion, ciudad, telefono, estado },
            { new: true, runValidators: true } // Devuelve el nuevo documento actualizado
        );

        if (!sucursalActualizada) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        res.json(sucursalActualizada);
    } catch (error) {
        console.error('Error al actualizar sucursal:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'El nombre de la sucursal ya existe' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ==========================
// Esquema para respaldar sucursales eliminadas
// ==========================
const sucursalEliminadaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  ciudad: String,
  telefono: String,
  estado: String,
  createdAt: Date,
  deletedAt: { type: Date, default: Date.now } // Fecha en que fue eliminada
});

const SucursalEliminada = mongoose.model('sucursalEliminada', sucursalEliminadaSchema);

// ==========================
// DELETE: Eliminar una sucursal con respaldo
// ==========================
app.delete('/api/sucursales/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sucursal = await Sucursal.findById(id);
    if (!sucursal) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    // Se guarda en la colección de respaldo
    const copia = new SucursalEliminada({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      ciudad: sucursal.ciudad,
      telefono: sucursal.telefono,
      estado: sucursal.estado,
      createdAt: sucursal.createdAt
    });

    await copia.save(); // Guarda copia
    await Sucursal.findByIdAndDelete(id); // Elimina sucursal original

    res.json({ message: 'Sucursal eliminada y respaldada correctamente' });
  } catch (error) {
    console.error('Error al eliminar y respaldar sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// ==========================
// Modelo de Usuario para login
// ==========================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const Usuario = mongoose.model('usuario', userSchema);

// ==========================
// Configuración de JWT
// ==========================
const jwt = require('jsonwebtoken');
const SECRET = 'mi_clave_secreta'; // ⚠️ En producción debe ser variable de entorno segura

// ==========================
// POST: Login de usuario
// ==========================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Se genera token con información del usuario
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

/*
  📌 Insertar usuario de ejemplo desde Mongo shell:
  db.usuarios.insertOne({
    email: "admin@correo.com",
    password: "admin123"
  })

📌 Prueba en Postman:
  {
  "email": "admin@correo.com",
  "password": "admin123"
}
*/

// ==========================
// Inicio del servidor
// ==========================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en puerto ${PORT}`);
});

/*
  📦 Ejemplo de JSON para pruebas POST o PUT:
  {
    "nombre": "Sucursal Prueba",
    "direccion": "Calle 50 # 10-20",
    "ciudad": "Bogotá",
    "telefono": "6015559999",
    "estado": "activa"
  }
*/
