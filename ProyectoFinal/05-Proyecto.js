// Importar librerías necesarias
const express = require('express');  // Express para manejar el servidor web y las rutas
const mongoose = require('mongoose');  // Mongoose para interactuar con MongoDB
const jwt = require('jsonwebtoken');  // JWT para generar y verificar tokens

const app = express();
app.use(express.json());  // Configurar para recibir peticiones en formato JSON

// Conexión a MongoDB (base Proyecto01)
mongoose.connect('mongodb://localhost:27017/Proyecto01', {})
    .then(() => console.log('Conectado a la base de datos Proyecto01'))
    .catch((error) => console.error('Error al conectar con MongoDB:', error));

// Clave secreta para firmar y verificar los tokens JWT (debe mantenerse en un lugar seguro)
const JWT_SECRET = 'mi_secreto_super_seguro';

// Definir el esquema del modelo Usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Usuario único y obligatorio
    password: { type: String, required: true },  // Contraseña en texto plano (¡debe mejorarse!)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },  // Rol permitido
    createdAt: { type: Date, default: Date.now }  // Fecha de creación automática
});
const User = mongoose.model('User', userSchema);  // Crear el modelo User

// Ruta POST para login (genera JWT si autenticación es exitosa)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });  // Buscar el usuario por username
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });  // No existe
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });  // Password no coincide
        }

        // Generar un token JWT con datos del usuario (payload)
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }  // Token válido por 1 hora
        );

        // Enviar respuesta diferenciada según rol
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
        res.status(500).json({ message: 'Error en el login', error: error.message });  // Error interno
    }
});

// Ruta POST para crear nuevos usuarios (sin autenticación previa)
app.post('/api/users', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existe = await User.findOne({ username });
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });  // Usuario duplicado
        }

        const nuevoUsuario = new User({ username, password, role });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: { username, role } });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

// Middleware para verificar JWT y controlar acceso por roles
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];  // Obtener encabezado Authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });  // No se envió token
    }

    const token = authHeader.split(' ')[1];  // Formato esperado: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token mal formado' });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });  // Token inválido o expirado
        }

        // Validar que el rol del usuario sea permitido
        if (decoded.role !== 'admin' && decoded.role !== 'user') {
            return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado' });
        }

        req.user = decoded;  // Guardar datos decodificados en el request para usarlos en la ruta
        next();  // Continuar a la siguiente función (ruta)
    });
}

// Ruta GET para listar usuarios, protegida con el middleware verificarToken
app.get('/api/users', verificarToken, async (req, res) => {
    try {
        const usuarios = await User.find({}, 'username role createdAt');  // Excluir password del resultado
        res.json({ message: 'Lista de usuarios', usuarios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// Configuración del servidor para escuchar en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);
});

/*
Datos de prueba sugeridos para crear un usuario:
{
  "username": "usuario2",
  "password": "pass123",
  "role": "user"
}
*/
