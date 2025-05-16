// Se importa el framework Express para crear el servidor web
const express = require('express');

// Se importa la librería jsonwebtoken para generar y verificar JWTs
const jwt = require('jsonwebtoken');

// Se crea una instancia de la aplicación Express
const app = express();

// Middleware para permitir que Express entienda JSON en las solicitudes
app.use(express.json());

// Clave secreta usada para firmar y verificar los tokens JWT
const CLAVE_SECRETA = 'mi_clave_secreta'; // En producción, usar variables de entorno

// Ruta POST /login — Simula un inicio de sesión
app.post('/login', (req, res) => {
  // Extrae el campo 'usuario' del cuerpo (body) de la solicitud
  const { usuario } = req.body;

  // Valida que el campo usuario haya sido enviado
  if (usuario) {
    // Muestra en consola el nombre del usuario recibido
    console.log({usuario});

    // Genera un token JWT con el nombre del usuario como carga útil (payload)
    // El token expira en 1 hora
    const token = jwt.sign({ usuario }, CLAVE_SECRETA, { expiresIn: '1h' });
    
    // Devuelve el token en formato JSON al cliente
    res.json({ token });
  } else {
    // Si no se envió el campo 'usuario', se responde con un error 400 (Bad Request)
    res.status(400).json({ error: 'Usuario requerido' });
  }
});

// Ruta GET /protegido — Requiere autenticación con token JWT
app.get('/protegido', (req, res) => {
  // Obtiene el valor del header Authorization
  const authHeader = req.headers.authorization;

  // Si no se envía el token, responde con error 401 (Unauthorized)
  if (!authHeader) return res.status(401).send('Falta el token');

  // Extrae solo el token, quitando la palabra "Bearer"
  const token = authHeader.split(' ')[1];

  try {
    // Verifica que el token sea válido y no haya expirado
    const decoded = jwt.verify(token, CLAVE_SECRETA);

    // Si es válido, responde con un mensaje de acceso y muestra el usuario del token
    res.send(`Acceso concedido a ${decoded.usuario}`);
  } catch (err) {
    // Si el token es inválido o ha expirado, responde con error 403 (Forbidden)
    res.status(403).send('Token inválido o expirado');
  }
});

// Inicia el servidor en el puerto 3000 y muestra un mensaje en consola
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
