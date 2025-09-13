const Usuario = require('../Models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const SECRET = process.env.JWT_SECRET;


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
  if (!usuario) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    //  Comparar contraseña ingresada contra la guardada en DB
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email,  rol: usuario.rol   }, SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
