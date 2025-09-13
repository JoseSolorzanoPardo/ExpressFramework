const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // En producción usa variable de entorno


const verificarToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  // Permitir "Bearer <token>" o token directo
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7) // quitar "Bearer "
    : authHeader;

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ msg: "Acceso denegado" });
    }
    next();
  };
};

module.exports = { verificarRol, verificarToken };
