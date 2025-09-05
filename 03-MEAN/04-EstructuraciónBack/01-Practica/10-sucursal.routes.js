// Importamos Express para definir las rutas del backend
const express = require('express');

// Creamos una instancia del enrutador
const router = express.Router();

// Importamos el controlador con la lógica de negocio para las sucursales
const controller = require('../Controllers/sucursal.controller');

// Importamos el middleware que verifica el token JWT
const { verificarToken } = require('../Middlewares/auth.middleware');

// Ruta GET: obtener todas las sucursales
// Esta ruta está protegida, solo se accede con un token válido
router.get('/', verificarToken, controller.getAll);

// Ruta POST: guardar una nueva sucursal
// Esta ruta no tiene protección (puede protegerse si es necesario)
router.post('/guardar', controller.create);

// Ruta PUT: actualizar una sucursal por su ID
router.put('/update/:id', controller.update);

// Ruta DELETE: eliminar una sucursal por su ID y respaldarla
router.delete('/delete/:id', controller.delete);

// Exportamos el router para poder usarlo en el archivo principal (server.js)
module.exports = router;
