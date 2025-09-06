//  Importación de dependencias necesarias
const express = require('express'); // Framework para crear aplicaciones web y APIs
const cors = require('cors');       // Middleware para permitir peticiones desde otros dominios (CORS)
const mongoose = require('mongoose'); // ODM para MongoDB que permite trabajar con esquemas y modelos

//  Crear instancia de la aplicación Express
const app = express();

//  Configuración de middlewares
app.use(cors()); // Habilita CORS para permitir peticiones externas
app.use(express.json()); // Habilita el análisis del cuerpo de las solicitudes en formato JSON

//  Conexión a la base de datos MongoDB usando Mongoose
mongoose.connect('mongodb://localhost:27017/ProyectoCRUDMean', {})
    .then(() => console.log(' Conectado a la base de datos ProyectoCRUDMean'))
    .catch((error) => console.error(' Error al conectar con MongoDB:', error));

//  Definición del esquema (estructura) de los documentos de sucursales
const sucursalSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true, trim: true }, // obligatorio, único, sin espacios extras
    direccion: { type: String, required: true, trim: true },
    ciudad: { type: String, required: true, trim: true },
    telefono: { type: String, trim: true },
    estado: { type: String, enum: ['activa', 'inactiva'], default: 'activa' }, // solo acepta estos dos valores
    createdAt: { type: Date, default: Date.now } // fecha automática de creación
});

//  Creación del modelo a partir del esquema
const Sucursal = mongoose.model('sucursal', sucursalSchema);

//  GET: Obtener todas las sucursales ordenadas por fecha de creación (más reciente primero)
app.get('/api/sucursales',verificarToken, async (req, res) => {
    try {
        const sucursales = await Sucursal.find().sort({ createdAt: -1 });
        res.json(sucursales);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//  POST: Crear una nueva sucursal
app.post('/api/sucursales/guardar', async (req, res) => {
    try {
        const { nombre, direccion, ciudad, telefono, estado } = req.body;

        // Validación básica de campos obligatorios
        if (!nombre || !direccion || !ciudad) {
            return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
        }

        const nuevaSucursal = new Sucursal({
            nombre,
            direccion,
            ciudad,
            telefono,
            estado
        });

        const sucursalGuardada = await nuevaSucursal.save(); // Guarda en la base de datos
        res.status(201).json(sucursalGuardada);
    } catch (error) {
        console.error('Error al crear sucursal:', error);
        if (error.code === 11000) { // Error por nombre duplicado
            return res.status(409).json({ message: 'El nombre de la sucursal ya existe' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//  PUT: Actualizar una sucursal existente por ID
app.put('/api/sucursales/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, ciudad, telefono, estado } = req.body;

        // Validación básica
        if (!nombre || !direccion || !ciudad) {
            return res.status(400).json({ message: 'nombre, direccion y ciudad son obligatorios' });
        }

        const sucursalActualizada = await Sucursal.findByIdAndUpdate(
            id,
            { nombre, direccion, ciudad, telefono, estado },
            { new: true, runValidators: true } // devuelve el documento actualizado y valida según el esquema
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


const sucursalEliminadaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  ciudad: String,
  telefono: String,
  estado: String,
  createdAt: Date,
  deletedAt: { type: Date, default: Date.now } // fecha en que se eliminó
});

const SucursalEliminada = mongoose.model('sucursalEliminada', sucursalEliminadaSchema);


// DELETE: Eliminar una sucursal por su ID
app.delete('/api/sucursales/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sucursal = await Sucursal.findById(id);
    if (!sucursal) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    // Guardar una copia en la colección de respaldo
    const copia = new SucursalEliminada({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      ciudad: sucursal.ciudad,
      telefono: sucursal.telefono,
      estado: sucursal.estado,
      createdAt: sucursal.createdAt
    });

    await copia.save();

    // Eliminar de la colección principal
    await Sucursal.findByIdAndDelete(id);

    res.json({ message: 'Sucursal eliminada y respaldada correctamente' });

  } catch (error) {
    console.error('Error al eliminar y respaldar sucursal:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


//  DELETE: Eliminar una sucursal por su ID
/*app.delete('/api/sucursales/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sucursal = await Sucursal.findByIdAndDelete(id);

        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        res.json({ message: 'Sucursal eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar sucursal:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});*/


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const Usuario = mongoose.model('usuario', userSchema);

const jwt = require('jsonwebtoken');
const SECRET = 'mi_clave_secreta'; // En producción usa variable de entorno

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


/*function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}*/

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  // Permitir "Bearer <token>" o token directo
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7) // quitar "Bearer "
    : authHeader;

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}


/*
db.usuarios.insertOne({
  email: "admin@correo.com",
  password: "admin123"
})
*/







//  Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en puerto ${PORT}`);
});

/*
📦 Ejemplo de cuerpo JSON para pruebas con POST o PUT:

{
  "nombre": "Sucursal Prueba",
  "direccion": "Calle 50 # 10-20",
  "ciudad": "Bogotá",
  "telefono": "6015559999",
  "estado": "activa"
}
*/
