// Importar las librerías necesarias
const express = require('express');  // Express para crear el servidor web y manejar rutas
const mongoose = require('mongoose');  // Mongoose para interactuar con MongoDB

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el middleware para aceptar JSON en las peticiones HTTP
app.use(express.json());

// Conexión a la base de datos MongoDB (base de datos 'Proyecto01')
mongoose.connect('mongodb://localhost:27017/Proyecto01', {})  // Cadena de conexión a MongoDB local
    .then(() => console.log('Conectado a la base de datos Proyecto01'))  // Mensaje si la conexión es exitosa
    .catch((error) => console.error('Error al conectar con MongoDB:', error));  // Mensaje de error si falla la conexión

// Definición del esquema del modelo de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Campo obligatorio y único para el nombre de usuario
    password: { type: String, required: true },  // Campo obligatorio para la contraseña (almacenada como texto plano, ¡mejor usar hash en producción!)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },  // Solo acepta 'admin' o 'user', por defecto 'user'
    createdAt: { type: Date, default: Date.now }  // Fecha de creación del usuario, por defecto la actual
});
const User = mongoose.model('User', userSchema);  // Crear el modelo User a partir del esquema

// Ruta POST para login del administrador
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;  // Se extraen el username y password enviados en la petición
    try {
        // Buscar un usuario con el username y rol 'admin'
        const user = await User.findOne({ username, role: 'admin' });
        if (!user) {
            // Si no existe, devolver un error 404
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        if (user.password !== password) {
            // Si la contraseña no coincide, devolver un error 401
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        // Si el login es exitoso, enviar un mensaje con el username
        res.json({ message: 'Login exitoso', usuario: user.username });
    } catch (error) {
        // Si ocurre un error, enviar error 500
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
});

// Nueva ruta POST para crear usuarios
app.post('/api/users', async (req, res) => {
    const { username, password, role } = req.body;  // Se extraen los datos enviados en el cuerpo de la petición
    try {
        // Verificar si el usuario ya existe
        const existe = await User.findOne({ username });
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });  // Si existe, error 400
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new User({ username, password, role });
        await nuevoUsuario.save();  // Guardar en la base de datos
        res.status(201).json({ message: 'Usuario creado exitosamente', user: { username, role } });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

// Ruta GET para listar todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        // Obtener todos los usuarios, solo mostrando username, role y createdAt (no se devuelve password por seguridad)
        const usuarios = await User.find({}, 'username role createdAt');
        res.json({ message: 'Lista de usuarios', usuarios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// Configurar el puerto donde se ejecutará el servidor Express
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);  // Mensaje indicando que el servidor está activo
});

/*

Datos de prueba (JSON para crear un usuario):
{
  "username": "usuario2",
  "password": "pass123",
  "role": "user"
}

*/
