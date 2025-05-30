// Importar librerías necesarias
const express = require('express');  // Express para crear el servidor y manejar las rutas
const mongoose = require('mongoose');  // Mongoose para interactuar con MongoDB
const jwt = require('jsonwebtoken');  // JWT para generar y verificar tokens

const app = express();
app.use(express.json());  // Middleware para procesar JSON en las peticiones

// Conexión a la base de datos MongoDB (Proyecto01)
mongoose.connect('mongodb://localhost:27017/Proyecto01', {})
    .then(() => console.log('Conectado a la base de datos Proyecto01'))
    .catch((error) => console.error('Error al conectar con MongoDB:', error));

// Clave secreta para firmar y verificar JWT (debe mantenerse privada)
const JWT_SECRET = 'mi_secreto_super_seguro';

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Nombre único y obligatorio
    password: { type: String, required: true },  // Contraseña en texto plano (mejor cifrar en producción)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },  // Rol permitido
    createdAt: { type: Date, default: Date.now }  // Fecha de creación automática
});
const User = mongoose.model('User', userSchema);  // Crear el modelo User

// Ruta POST para login, genera JWT tras autenticación correcta
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });  // Buscar usuario por username
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT válido por 1 hora
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },  // Datos incluidos en el token
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respuesta diferenciada según rol
        if (user.role === 'admin') {
            res.json({
                message: 'Login exitoso como administrador',
                usuario: user.username,
                role: 'admin',
                token
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
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
});

// Ruta POST para crear usuarios, protegida por verificarToken (solo admin)
app.post('/api/users', verificarToken, async (req, res) => {
    // Verificar que el usuario autenticado sea admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden crear usuarios.' });
    }

    const { username, password, role } = req.body;
    try {
        const existe = await User.findOne({ username });  // Verificar si el usuario ya existe
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const nuevoUsuario = new User({ username, password, role });
        await nuevoUsuario.save();  // Guardar en la base de datos
        res.status(201).json({ message: 'Usuario creado exitosamente', user: { username, role } });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

// Middleware para verificar JWT y controlar acceso por roles
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];  // Leer el encabezado Authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });  // Sin token
    }

    const token = authHeader.split(' ')[1];  // Formato "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token mal formado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });  // Token expirado o no válido
        }

        // Validar que el rol sea permitido
        if (decoded.role !== 'admin' && decoded.role !== 'user') {
            return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado' });
        }

        req.user = decoded;  // Almacenar los datos decodificados en req.user
        next();  // Continuar a la siguiente función (ruta)
    });
}

// Ruta GET para obtener la lista de usuarios, protegida por verificarToken
app.get('/api/users', verificarToken, async (req, res) => {
    try {
        const usuarios = await User.find({}, 'username role createdAt');  // Solo campos seguros (sin contraseña)
        res.json({ message: 'Lista de usuarios', usuarios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// Configuración del servidor Express en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);
});

/*
Datos de prueba sugeridos para crear usuario (POST /api/users):
{
  "username": "usuario2",
  "password": "pass123",
  "role": "user"
}
*/
