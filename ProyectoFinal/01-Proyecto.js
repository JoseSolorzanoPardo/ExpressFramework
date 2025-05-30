// Importar las librerías necesarias
const express = require('express');  // Importa Express, un framework para crear aplicaciones web y APIs en Node.js
const mongoose = require('mongoose');  // Importa Mongoose, una librería para manejar bases de datos MongoDB

// Crear una instancia de la aplicación Express
const app = express();

// Configurar Express para aceptar datos en formato JSON
app.use(express.json());

// Conexión a la base de datos MongoDB (base de datos "Proyecto01")
// Se usa la cadena de conexión 'mongodb://localhost:27017/Proyecto01'
mongoose.connect('mongodb://localhost:27017/Proyecto01', {})
    .then(() => console.log('Conectado a la base de datos Proyecto01'))  // Mensaje si la conexión es exitosa
    .catch((error) => console.error('Error al conectar con MongoDB:', error));  // Mensaje si ocurre un error

// Definición del esquema (estructura) del modelo User usando Mongoose
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },  // Campo obligatorio y único para el nombre de usuario
    password: { type: String, required: true },  // Campo obligatorio para la contraseña (texto plano en este caso)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },  // Rol del usuario, puede ser 'admin' o 'user', por defecto 'user'
    createdAt: { type: Date, default: Date.now }  // Fecha de creación del usuario, por defecto la fecha actual
});

// Crear el modelo User basado en el esquema definido
const User = mongoose.model('User', userSchema);

// Ruta POST para que un administrador inicie sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;  // Se extraen username y password del cuerpo de la petición
    try {
        // Buscar un usuario con el username especificado y rol 'admin'
        const user = await User.findOne({ username, role: 'admin' });
        if (!user) {
            // Si no se encuentra el usuario, se devuelve un error 404
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        if (user.password !== password) {
            // Si la contraseña no coincide, se devuelve un error 401
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si el login es exitoso, se devuelve un mensaje junto con el nombre del usuario
        res.json({ message: 'Login exitoso', usuario: user.username });
    } catch (error) {
        // Si ocurre un error durante el proceso, se devuelve un error 500
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
});

// Definir el puerto en el que correrá el servidor (3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en puerto ${PORT}`);  // Mensaje indicando que el servidor está activo
});

/*
1. Paso: Creación de usuario en la base de datos MongoDB

--use usuarios                  // Cambiar al contexto de la base de datos 'usuarios'
--db.createCollection("users")  // Crear la colección 'users' donde se almacenarán los documentos

--Estructura de un documento de usuario:
{
  "_id": ObjectId,                 // Identificador único generado automáticamente
  "username": String,              // Nombre de usuario único y obligatorio
  "password": String,              // Contraseña del usuario (en este ejemplo, sin cifrar)
  "role": String,                  // Rol: puede ser 'admin' o 'user'
  "createdAt": Date                // Fecha y hora de creación del documento
}

--Insertar un documento de usuario 'admin'
db.users.insertOne({
  username: "admin",
  password: "admin123",           // Contraseña sin encriptar (no recomendado en producción)
  role: "admin",
  createdAt: new Date()
})

*/
