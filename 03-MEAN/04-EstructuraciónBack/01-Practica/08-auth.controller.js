//  Importamos el modelo de Usuario que representa la colección en MongoDB
const Usuario = require("../Models/usuario.model");

//  Importamos jsonwebtoken para generar y verificar tokens JWT
const jwt = require('jsonwebtoken');

//  Obtenemos la clave secreta para firmar los tokens desde variables de entorno
const SECRET = process.env.JWT_SECRET;

//  Controlador para manejar la ruta POST /api/auth/login
exports.login = async (req, res) => {
  //  Extraemos email y password desde el cuerpo de la solicitud
  const { email, password } = req.body;

  //  Buscamos al usuario en la base de datos por su email
  const usuario = await Usuario.findOne({ email });

  //  Si no se encuentra el usuario o la contraseña no coincide, se devuelve error 401
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  //  Si las credenciales son válidas, generamos un token JWT
  const token = jwt.sign(
    { id: usuario._id, email: usuario.email }, //  Datos que incluimos en el payload del token
    SECRET,                                   //  Clave secreta para firmar el token
    { expiresIn: '2h' }                       //  Tiempo de expiración del token (2 horas)
  );

  //  Respondemos con el token generado
  res.json({ token });
};
