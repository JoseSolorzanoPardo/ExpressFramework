// Importamos la librería jsonwebtoken para manejar la verificación de tokens JWT
const jwt = require('jsonwebtoken');

// Clave secreta para validar el token, obtenida desde las variables de entorno
const SECRET = process.env.JWT_SECRET;

// Middleware para verificar la validez del token JWT enviado por el cliente
exports.verificarToken = (req, res, next) => {
  // Obtenemos el valor del encabezado Authorization de la solicitud
  const authHeader = req.headers['authorization'];

  // Si no se envía ningún token, retornamos error 403 (prohibido)
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  // Si el token viene con el prefijo "Bearer ", lo eliminamos para quedarnos solo con el token
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7) // Quita los primeros 7 caracteres: "Bearer "
    : authHeader;

  try {
    // Verificamos el token con la clave secreta
    const decoded = jwt.verify(token, SECRET);

    // Si es válido, adjuntamos los datos del usuario decodificado al objeto `req`
    req.usuario = decoded;

    // Continuamos con el siguiente middleware o controlador
    next();
  } catch (error) {
    // Si el token es inválido o ha expirado, respondemos con error 401 (no autorizado)
    return res.status(401).json({ message: 'Token inválido' });
  }
};
