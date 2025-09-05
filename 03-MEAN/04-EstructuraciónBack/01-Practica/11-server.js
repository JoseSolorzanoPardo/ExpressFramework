// Cargamos las variables de entorno definidas en el archivo .env
require('dotenv').config();

// Importamos las dependencias necesarias
const express = require('express'); // Framework web
const cors = require('cors');       // Middleware para habilitar CORS (acceso entre dominios)

// Importamos la función que conecta con la base de datos MongoDB
const connectDB = require('./config/db');

// Creamos una instancia de la aplicación Express
const app = express();

// Establecemos conexión con la base de datos
connectDB();

// Aplicamos middlewares globales
app.use(cors());            // Permite solicitudes desde otros orígenes (CORS)
app.use(express.json());    // Permite recibir y procesar datos en formato JSON

// Registramos las rutas principales del proyecto
app.use('/api/sucursales', require('./Routes/sucursal.routes')); // Rutas CRUD de sucursales
app.use('/api/auth', require('./Routes/auth.routes'));           // Ruta para autenticación de usuarios

// Definimos el puerto del servidor, usando la variable de entorno si existe
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor y mostramos mensaje en consola
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
