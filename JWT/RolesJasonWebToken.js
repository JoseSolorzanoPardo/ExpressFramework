// archivo: app.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Clave secreta hardcodeada
const CLAVE_SECRETA = 'clave_super_secreta';

// Simula una base de datos de usuarios
const usuarios = [
  { usuario: 'jose', rol: 'admin' },
  { usuario: 'maria', rol: 'estudiante' }
];

// Login: genera token con rol
app.post('/login', (req, res) => {
  const { usuario } = req.body;

  const user = usuarios.find(u => u.usuario === usuario);
  /*let user = null;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === usuario) {
      user = usuarios[i];
      break;
    }
  }*/


  
  if (!user) return res.status(401).send('Usuario no encontrado');

  const token = jwt.sign(
    { usuario: user.usuario, rol: user.rol },
    CLAVE_SECRETA,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Middleware para verificar token
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Falta token');

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, CLAVE_SECRETA);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).send('Token inválido');
  }
}

// Middleware para verificar rol
function soloRol(rolPermitido) {
  return (req, res, next) => {
    if (req.usuario.rol !== rolPermitido) {
      return res.status(403).send('Acceso denegado: rol insuficiente');
    }
    next();
  };
}

// Ruta pública
app.get('/', (req, res) => {
  res.send('Bienvenido a la API pública');
});

// Ruta solo para ADMIN
app.get('/admin', verificarToken, soloRol('admin'), (req, res) => {
  res.send(`Hola ${req.usuario.usuario}, tienes acceso como ADMIN`);
});

// Ruta solo para ESTUDIANTE
app.get('/estudiante', verificarToken, soloRol('estudiante'), (req, res) => {
  res.send(`Hola ${req.usuario.usuario}, tienes acceso como ESTUDIANTE`);
});

// Ruta para cualquier usuario autenticado
app.get('/perfil', verificarToken, (req, res) => {
  res.send(`Hola ${req.usuario.usuario}, tu rol es ${req.usuario.rol}`);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
