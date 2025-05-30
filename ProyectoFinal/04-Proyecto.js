// Importar librerías necesarias
const express = require('express');  // Express para crear el servidor web y manejar rutas
const mongoose = require('mongoose');  // Mongoose para interactuar con MongoDB
const jwt = require('jsonwebtoken');  // JWT para generar y verificar tokens de autenticación

// Crear la aplicación Express
const app = express();

// Configurar middleware para aceptar datos JSON
app.use(express.json());

// Conexión a la base de datos MongoDB (base Proyecto01)
mongoose.connect('mongodb://localhost:27017/Proyecto01', {})
    .then(() => console.log('Conectado a la base de datos Proyecto01'))  // Mensaje si la conexión es exitosa
    .catch((error) => console.error('Error al conectar con MongoDB:', error));  // Mensaje si ocurre un error

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = 'mi_secreto_super_seguro';  // Esta clave debe ser privada y almacenada de forma segura

// Definir el esquema de usuario (modelo)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Nombre de usuario único y obligatorio
    password: { type: String, required: true },  // Contraseña en texto plano (¡no recomendado en producción!)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },  // Rol del usuario (admin o user)
    createdAt: { type: Date, default: Date.now }  // Fecha de creación (automáticamente la actual)
});
const User = mongoose.model('User', userSchema);  // Crear el modelo User a partir del esquema

// Ruta POST para login (generando JWT al autenticar correctamente)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;  // Extraer username y password del cuerpo de la petición
    try {
        const user = await User.findOne({ username });  // Buscar usuario por username
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });  // Error si no existe
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });  // Error si la contraseña no coincide
        }

        // Si la autenticación es exitosa, generar un token JWT
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },  // Payload: info incluida en el token
            JWT_SECRET,  // Clave secreta para firmar el token
            { expiresIn: '1h' }  // Configuración del token: expira en 1 hora
        );

        // Devolver la respuesta con el token y datos del usuario según su rol
        if (user.role === 'admin') {
            res.json({
                message: 'Login exitoso como administrador',
                usuario: user.username,
                role: 'admin',
                token  // Token JWT para futuras autenticaciones
            });
        } else {
            res.json({
                message: 'Login exitoso como usuario',
                usuario: user.username,
                role: 'user',
                token
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error.message });  // Error en el servidor
    }
});

// Ruta POST para crear nuevos usuarios
app.post('/api/users', async (req, res) => {
    const { username, password, role } = req.body;  // Extraer datos del cuerpo
    try {
        const existe = await User.findOne({ username });  // Verificar si ya existe el usuario
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });  // Error si ya existe
        }

        const nuevoUsuario = new User({ username, password, role });  // Crear nuevo usuario
        await nuevoUsuario.save();  // Guardar en la base de datos
        res.status(201).json({ message: 'Usuario creado exitosamente', user: { username, role } });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });  // Error en el servidor
    }
});

// Ruta GET para obtener todos los usuarios (oculta la contraseña)
app.get('/api/users', async (req, res) => {
    try {
        const usuarios = await User.find({}, 'username role createdAt');  // Solo se devuelven campos específicos
        res.json({ message: 'Lista de usuarios', usuarios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// Configuración del puerto y arranque del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);  // Mensaje indicando que el servidor está activo
});

/*
Datos de prueba sugeridos para la creación de un usuario (POST /api/users):
{
  "username": "usuario2",
  "password": "pass123",
  "role": "user"
}
*/

