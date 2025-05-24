/*npm init -y
npm install express
npm install nodemon
*/

// Importamos el módulo express para crear la aplicación web
const express = require('express');
const app = express();

// Middleware para procesar el cuerpo de las peticiones JSON
app.use(express.json());

// Simulamos una base de datos en memoria (un arreglo simple)
const usuarios = [
  { id: 1, nombre: 'Jose' },
  { id: 2, nombre: 'Maria' }
];

// Definimos una ruta GET para obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  try {
    // Obtenemos el parámetro 'id' de la URL y lo convertimos a número
    const id = parseInt(req.params.id);

    // Validamos si el parámetro 'id' es un número válido
    if (isNaN(id)) {
      // Si no es número, devolvemos un error 400 (Bad Request)
      return res.status(400).json({ mensaje: 'El ID debe ser un número' });
    }

    // Buscamos el usuario en el arreglo 'usuarios'
    const usuario = usuarios.find(u => u.id === id);

    // Si no se encuentra el usuario, respondemos con un error 404 (Not Found)
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Si todo está bien, devolvemos el usuario encontrado
    res.json(usuario);

  } catch (error) {
    // Capturamos cualquier error inesperado (errores internos del servidor)
    console.error('Error inesperado:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// Configuramos el servidor para que escuche en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

/* Casos de prueba:
GET /usuarios/1
 Respuesta: { "id": 1, "nombre": "Jose" }

GET /usuarios/99
 Respuesta: { "mensaje": "Usuario no encontrado" } (404)

GET /usuarios/abc
 Respuesta: { "mensaje": "El ID debe ser un número" } (400)

Si hay un error inesperado (por ejemplo, error en el código),
 Respuesta: { "mensaje": "Error del servidor" } (500)


Explicación de los códigos de estado HTTP utilizados:

400: Error del cliente (datos mal enviados, por ejemplo, ID no numérico)
404: Recurso no encontrado (no existe un usuario con ese ID)
500: Error interno del servidor (problemas en la lógica o ejecución del código)
*/

