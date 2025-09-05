// Importamos Express para definir las rutas del servidor
const express = require('express');

// Creamos un nuevo enrutador usando Router de Express
const router = express.Router();

// Importamos el controlador que maneja la lógica del login
const controller = require('../Controllers/auth.controller');

// Definimos la ruta POST para iniciar sesión
// Cuando se haga una petición POST a /api/auth/login se ejecutará controller.login
router.post('/login', controller.login);

// Exportamos el router para poder usarlo en server.js u otro archivo principal
module.exports = router;
