// Importar librerías necesarias
const express = require('express');  // Express: Framework para crear servidores web y APIs
const mongoose = require('mongoose');  // Mongoose: Librería para interactuar con bases de datos MongoDB

// Crear la aplicación Express
const app = express();

// Configurar el servidor para aceptar peticiones en formato JSON
app.use(express.json());

// Conexión a MongoDB (base de datos 'Proyecto01')
mongoose.connect('mongodb://localhost:27017/Proyecto01', {})
    .then(() => console.log('Conectado a la base de datos Proyecto01'))  // Conexión exitosa
    .catch((error) => console.error('Error al conectar con MongoDB:', error));  // Error en la conexión

// Definir el esquema y modelo de usuario usando Mongoose
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Nombre de usuario (obligatorio y único)
    password: { type: String, required: true },  // Contraseña (en texto plano, ¡inseguro en producción!)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },  // Rol (admin o user)
    createdAt: { type: Date, default: Date.now }  // Fecha de creación (por defecto, fecha actual)
});
const User = mongoose.model('User', userSchema);  // Crear el modelo 'User'

// Ruta POST para login (acepta cualquier usuario, no solo admin)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;  // Extraer datos del cuerpo de la petición
    try {
        // Buscar al usuario por username (sin filtrar por rol)
        const user = await User.findOne({ username });
        if (!user) {
            // Si no existe, retornar 404
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user.password !== password) {
            // Si la contraseña no coincide, retornar 401
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si el login es correcto, enviar un mensaje personalizado según el rol
        if (user.role === 'admin') {
            res.json({ message: 'Login exitoso como administrador', usuario: user.username, role: 'admin' });
        } else {
            res.json({ message: 'Login exitoso como usuario', usuario: user.username, role: 'user' });
        }
    } catch (error) {
        // Error general en el proceso
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
});

// Ruta POST para crear nuevos usuarios
app.post('/api/users', async (req, res) => {
    const { username, password, role } = req.body;  // Extraer datos del cuerpo de la petición
    try {
        // Verificar si el usuario ya existe
        const existe = await User.findOne({ username });
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });  // Error si existe
        }

        // Crear y guardar el nuevo usuario
        const nuevoUsuario = new User({ username, password, role });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: { username, role } });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

// Ruta GET para listar todos los usuarios (sin mostrar la contraseña)
app.get('/api/users', async (req, res) => {
    try {
        // Obtener todos los usuarios, solo mostrando username, role y createdAt
        const usuarios = await User.find({}, 'username role createdAt');
        res.json({ message: 'Lista de usuarios', usuarios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// Configurar el servidor para escuchar en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);
});

/*
Datos de prueba sugeridos (para probar la creación de usuario):
{
  "username": "usuario2",
  "password": "pass123",
  "role": "user"
}
*/
