const express = require('express');

const router = express.Router();

const controller = require('../Controllers/sucursal.controller');
const {verificarToken} = require('../Middlewares/auth.middleware');
const {verificarRol} = require('../Middlewares/auth.middleware');

router.get('/', verificarToken, controller.getAll);
router.post('/guardar',verificarToken, controller.create);
router.put('/update/:id',verificarToken, controller.update);
router.delete('/delete/:id',verificarToken, verificarRol(["admin"]), controller.delete);

module.exports = router;
