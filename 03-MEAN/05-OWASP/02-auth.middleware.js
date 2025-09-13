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

/*
 * Middleware de autorización por roles
 * -----------------------------------
 * Esta función recibe una lista de roles permitidos y devuelve 
 * un middleware de Express que valida si el usuario autenticado 
 * tiene el rol necesario para acceder a la ruta.
 */
const verificarRol = (rolesPermitidos) => {
  
  /*
   * Retornamos un middleware estándar de Express.
   * - req: objeto con la petición del cliente.
   * - res: objeto para enviar la respuesta.
   * - next: función que pasa el control al siguiente middleware o controlador.
   */
  return (req, res, next) => {

    /*
     * Validamos si el rol del usuario (extraído del JWT en verificarToken)
     * se encuentra dentro de los roles permitidos para esta ruta.
     * 
     * Ejemplo:
     * rolesPermitidos = ["admin"]
     * req.usuario.rol = "user"
     * Resultado: el rol no está incluido → acceso denegado.
     */
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      // Si no está autorizado, devolvemos código HTTP 403 (Forbidden)
      return res.status(403).json({ msg: "Acceso denegado" });
    }

    /*
     * Si el rol del usuario está permitido, continuamos con la 
     * ejecución de la siguiente función en la cadena de middlewares.
     */
    next();
  };
};

module.exports = { verificarRol, verificarToken };
