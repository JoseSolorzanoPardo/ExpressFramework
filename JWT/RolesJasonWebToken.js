// archivo: app.js

// Se importa el framework Express para crear el servidor web
const express = require('express');

// Se importa la librería jsonwebtoken para crear y verificar JWTs
const jwt = require('jsonwebtoken');

// Se crea una instancia de la aplicación Express
const app = express();

// Middleware para que Express pueda procesar cuerpos JSON en las solicitudes
app.use(express.json());

// Clave secreta usada para firmar/verificar los tokens (debería ir en variable de entorno en producción)
const CLAVE_SECRETA = 'clave_super_secreta';

// Simula una "base de datos" de usuarios con nombre de usuario y rol
const usuarios = [
  { usuario: 'jose', rol: 'admin' },
  { usuario: 'maria', rol: 'estudiante' }
];

// Ruta POST /login — Permite generar un token JWT para un usuario
app.post('/login', (req, res) => {
  // Extrae el nombre de usuario desde el cuerpo de la solicitud
  const { usuario } = req.body;

  // Busca el usuario en el array de usuarios usando el método .find()
  const user = usuarios.find(u => u.usuario === usuario);

  /*
  // Alternativa explícita con bucle for:
  let user = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === usuario) {
      user = usuarios[i];
      break;
    }
  }
  */

  // Si no se encuentra el usuario, se responde con error 401 (no autorizado)
  if (!user) return res.status(401).send('Usuario no encontrado');

  // Si el usuario existe, se genera un token JWT con su nombre y rol como payload
  // El token expirará en 1 hora
  const token = jwt.sign(
    { usuario: user.usuario, rol: user.rol },
    CLAVE_SECRETA,
    { expiresIn: '1h' }
  );

  // Se devuelve el token como respuesta en formato JSON
  res.json({ token });
});

// Middleware para verificar la validez del token JWT
function verificarToken(req, res, next) {
  // Se obtiene el encabezado Authorization
  const authHeader = req.headers.authorization;

  // Si no hay encabezado, responde con error 401
  if (!authHeader) return res.status(401).send('Falta token');

  // Extrae el token desde el encabezado (formato: "Bearer token")
  const token = authHeader.split(' ')[1];

  try {
    // Verifica el token usando la clave secreta
    const decoded = jwt.verify(token, CLAVE_SECRETA);

    // Si es válido, se almacena la información del usuario en req.usuario
    req.usuario = decoded;

    // Continúa con la siguiente función en la cadena (siguiente middleware o ruta)
    next();
  } catch (err) {
    // Si el token es inválido o expiró, responde con error 403
    res.status(403).send('Token inválido');
  }
}

// Middleware para permitir solo a usuarios con un rol específico
function soloRol(rolPermitido) {
  // Retorna un middleware que compara el rol del usuario autenticado
  return (req, res, next) => {
    if (req.usuario.rol !== rolPermitido) {
      // Si el rol no coincide, responde con error 403
      return res.status(403).send('Acceso denegado: rol insuficiente');
    }
    // Si el rol es válido, continúa
    next();
  };
}

// Ruta pública accesible sin autenticación
app.get('/', (req, res) => {
  res.send('Bienvenido a la API pública');
});

// Ruta solo accesible por usuarios con rol "admin"
app.get('/admin', verificarToken, soloRol('admin'), (req, res) => {
  res.send(`Hola ${req.usuario.usuario}, tienes acceso como ADMIN`);
});

// Ruta solo accesible por usuarios con rol "estudiante"
app.get('/estudiante', verificarToken, soloRol('estudiante'), (req, res) => {
  res.send(`Hola ${req.usuario.usuario}, tienes acceso como ESTUDIANTE`);
});

// Ruta accesible por cualquier usuario autenticado, sin importar el rol
app.get('/perfil', verificarToken, (req, res) => {
  res.send(`Hola ${req.usuario.usuario}, tu rol es ${req.usuario.rol}`);
});

// Inicia el servidor escuchando en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
