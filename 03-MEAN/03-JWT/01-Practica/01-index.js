// ================================
//  Importación de dependencias
// ================================
const express = require('express'); // Framework para crear aplicaciones web y APIs REST
const cors = require('cors');       // Middleware que permite solicitudes desde otros dominios (CORS)
const mongoose = require('mongoose'); // ODM para MongoDB: facilita trabajar con colecciones y esquemas
const jwt = require('jsonwebtoken'); // Librería para generar y verificar tokens JWT

// ================================
//  Crear instancia de la aplicación Express
// ================================
const app = express();

// ================================
//  Configuración de middlewares
// ================================
app.use(cors());            // Permite que clientes externos (ej: Angular) consuman la API
app.use(express.json());    // Habilita la lectura de cuerpos en formato JSON (req.body)

// ================================
//  Conexión a la base de datos MongoDB
// ================================
mongoose.connect('mongodb://localhost:27017/ProyectoCRUDMean', {})
    .then(() => console.log('✅ Conectado a la base de datos ProyectoCRUDMean'))
    .catch((error) => console.error('❌ Error al conectar con MongoDB:', error));

// ================================
//  Definición del esquema y modelo de sucursales
// ================================
const sucursalSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true, trim: true }, // Campo obligatorio, único y sin espacios extras
    direccion: { type: String, required: true, trim: true },
    ciudad: { type: String, required: true, trim: true },
    telefono: { type: String, trim: true },
    estado: { type: String, enum: ['activa', 'inactiva'], default: 'activa' }, // Solo acepta estos dos valores
    createdAt: { type: Date, default: Date.now } // Fecha automática de creación
});

// Modelo asociado a la colección 'sucursales'
const Sucursal = mongoose.model('sucursal', sucursalSchema);

// ================================
//  Rutas CRUD para sucursales
// ================================

// GET: Obtener todas las sucursales ordenadas por fecha (más recientes primero)
app.get('/api/sucursales', verificarToken, async (req, res) => {
    try {
        const sucursales = await Sucursal.find().sort({ createdAt: -1 });
        res.json(sucursales);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// POST: Crear una nueva sucursal
app.post('/api/sucursales/guardar', async (req, res) => {
    try {
        const { nombre, direccion, ciudad, telefono, estado } = req.body;

        // Validación de campos obligatorios
        if (!nombre || !direccion || !ciudad) {
            return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
        }

        const nuevaSucursal = new Sucursal({ nombre, direccion, ciudad, telefono, estado });
        const sucursalGuardada = await nuevaSucursal.save(); // Guardar en BD
        res.status(201).json(sucursalGuardada);
    } catch (error) {
        console.error('Error al crear sucursal:', error);
        if (error.code === 11000) { // Código de error de duplicado (campo unique)
            return res.status(409).json({ message: 'El nombre de la sucursal ya existe' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// PUT: Actualizar una sucursal por ID
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
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida
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

// ================================
//  Esquema y modelo para respaldo de sucursales eliminadas
// ================================
const sucursalEliminadaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  ciudad: String,
  telefono: String,
  estado: String,
  createdAt: Date,
  deletedAt: { type: Date, default: Date.now } // Fecha en que se eliminó
});

const SucursalEliminada = mongoose.model('sucursalEliminada', sucursalEliminadaSchema);

// DELETE: Eliminar una sucursal (y guardar copia en otra colección)
app.delete('/api/sucursales/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sucursal = await Sucursal.findById(id);
    if (!sucursal) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    // Crear copia antes de eliminar
    const copia = new SucursalEliminada({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      ciudad: sucursal.ciudad,
      telefono: sucursal.telefono,
      estado: sucursal.estado,
      createdAt: sucursal.createdAt
    });

    await copia.save();              // Guardar en colección de respaldo
    await Sucursal.findByIdAndDelete(id); // Eliminar de la colección principal

    res.json({ message: 'Sucursal eliminada y respaldada correctamente' });
  } catch (error) {
    console.error('Error al eliminar y respaldar sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// ================================
//  Modelo de Usuario (para login)
// ================================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
});

const Usuario = mongoose.model('usuario', userSchema);

// ================================
//  Autenticación con JWT
// ================================
const SECRET = 'mi_clave_secreta'; // ⚠️ En producción usar variables de entorno

// Endpoint de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email });

    // Validar credenciales
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT con expiración de 2 horas
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Middleware para verificar token en rutas protegidas
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  // Soporta formato "Bearer <token>" o solo el token
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7) // Elimina "Bearer "
    : authHeader;

  try {
    const decoded = jwt.verify(token, SECRET); // Verifica token con la clave secreta
    req.usuario = decoded; // Adjunta datos del usuario al request
    next(); // Permite continuar a la siguiente función
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

// ================================
//  Inicialización del servidor
// ================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Servidor Express corriendo en puerto ${PORT}`);
});

/*
Ejemplo de JSON para pruebas con POST o PUT:

{
  "nombre": "Sucursal Prueba",
  "direccion": "Calle 50 # 10-20",
  "ciudad": "Bogotá",
  "telefono": "6015559999",
  "estado": "activa"
}
*/
