// archivo: app.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const CLAVE_SECRETA = 'mi_clave_secreta'; // En producción, usar variables de entorno

// Simulación de login
app.post('/login', (req, res) => {
  const { usuario } = req.body;

 // console.log({usuario});

  // Normalmente aquí validarías el usuario y contraseña
  if (usuario) {
    console.log({usuario});
    const token = jwt.sign({ usuario }, CLAVE_SECRETA, { expiresIn: '1h' });
    
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Usuario requerido' });
  }
});

// Ruta protegida
app.get('/protegido', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Falta el token');

  const token = authHeader.split(' ')[1]; // "Bearer token"

  try {
    const decoded = jwt.verify(token, CLAVE_SECRETA);
    res.send(`Acceso concedido a ${decoded.usuario}`);
  } catch (err) {
    res.status(403).send('Token inválido o expirado');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
