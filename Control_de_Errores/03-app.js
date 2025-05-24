// Importamos el framework Express y la librería JSON Web Token
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
// Middleware para procesar cuerpos JSON en las solicitudes
app.use(express.json());

// Definimos la clave secreta para firmar y verificar JWT
const CLAVE_SECRETA = 'mi_clave_super_segura';

// -------------------------------------------------------------
// Ruta POST /login para generar un token JWT (simula autenticación)
// -------------------------------------------------------------
app.post('/login', (req, res) => {
  const { usuario } = req.body;

  // Validamos que el usuario se envíe en el body
  if (!usuario) {
    return res.status(400).json({ mensaje: 'Usuario es obligatorio' });
  }

  // Generamos un token JWT firmado con la clave secreta
  // Incluimos el usuario en el payload y definimos expiración de 1 hora
  const token = jwt.sign({ usuario }, CLAVE_SECRETA, { expiresIn: '1h' });

  // Devolvemos el token generado al cliente
  res.json({ token });
});

// -------------------------------------------------------------
// Middleware para verificar JWT en las rutas protegidas
// -------------------------------------------------------------
function verificarToken(req, res, next) {
  // Obtenemos el header de autorización
  const authHeader = req.headers.authorization;

  // Validamos que se haya enviado el token
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  // Extraemos el token del header (formato: "Bearer token")
  const token = authHeader.split(' ')[1];

  try {
    // Verificamos y decodificamos el token usando la clave secreta
    const decoded = jwt.verify(token, CLAVE_SECRETA);
    // Guardamos la información del usuario en la solicitud
    req.usuario = decoded;
    // Continuamos con la siguiente función o ruta
    next();
  } catch (err) {
    console.error('Error de JWT:', err.message);

    // Validamos tipos específicos de error de JWT
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ mensaje: 'Token expirado' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ mensaje: 'Token inválido' });
    }

    // Otro tipo de error
    return res.status(500).json({ mensaje: 'Error al verificar token' });
  }
}

// -------------------------------------------------------------
// Ruta GET /protegida, solo accesible si el JWT es válido
// -------------------------------------------------------------
app.get('/protegida', verificarToken, (req, res) => {
  res.json({ mensaje: `Bienvenido ${req.usuario.usuario}, acceso concedido` });
});

// -------------------------------------------------------------
// Middleware para manejar rutas no encontradas (404)
// -------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// -------------------------------------------------------------
// Middleware global para manejar errores no capturados
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('Error global:', err.message);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' });
});

// -------------------------------------------------------------
// Iniciamos el servidor en el puerto 3000 y mostramos mensaje
// -------------------------------------------------------------
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
