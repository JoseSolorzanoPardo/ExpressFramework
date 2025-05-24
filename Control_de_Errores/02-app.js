// Importamos el framework Express
const express = require('express');
// Creamos una aplicación de Express
const app = express();

// Middleware para que Express pueda procesar JSON en los cuerpos de las solicitudes
app.use(express.json());

/*
 * Ruta POST /registroUsuario
 * Permite registrar un usuario enviando nombre y edad en el cuerpo de la solicitud
 */
app.post('/registroUsuario', (req, res) => {
  try {
    // Extraemos nombre y edad del cuerpo de la solicitud
    const { nombre, edad } = req.body;

    // Validamos que el nombre sea obligatorio y de tipo string
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio y debe ser texto' });
    }

    // Validamos que la edad sea un número positivo
    if (!edad || typeof edad !== 'number' || edad <= 0) {
      return res.status(400).json({ mensaje: 'La edad debe ser un número positivo' });
    }

    // Simulamos el guardado del nuevo usuario (en lugar de una base de datos)
    const nuevoUsuario = { id: Date.now(), nombre, edad };
    // Devolvemos una respuesta de éxito con el nuevo usuario
    res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });

  } catch (error) {
    // Capturamos cualquier error y lo mostramos en consola
    console.error('Error al crear usuario:', error.message);
    // Devolvemos una respuesta de error del servidor
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

/*
 * Ruta GET /dividir
 * Permite dividir dos números enviados como parámetros de consulta (query)
 */
app.get('/dividir', (req, res) => {
  try {
    // Extraemos los parámetros a y b de la query
    const { a, b } = req.query;

    // Convertimos los parámetros a números flotantes
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    // Validamos que ambos parámetros sean números válidos
    if (isNaN(numA) || isNaN(numB)) {
      return res.status(400).json({ mensaje: 'Los parámetros deben ser números' });
    }

    // Validamos que no se intente dividir por cero
    if (numB === 0) {
      return res.status(400).json({ mensaje: 'No se puede dividir por cero' });
    }

    // Calculamos el resultado de la división
    const resultado = numA / numB;
    // Devolvemos el resultado en formato JSON
    res.json({ resultado });

  } catch (error) {
    // Capturamos cualquier error y lo mostramos en consola
    console.error('Error en la división:', error.message);
    // Devolvemos una respuesta de error del servidor
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

/*
 * Middleware para manejar rutas no encontradas (404)
 * Se ejecuta cuando ninguna ruta coincide
 */
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

/*
 * Middleware global de manejo de errores
 * Captura cualquier error no manejado en las rutas anteriores
 */
app.use((err, req, res, next) => {
  console.error('Error global:', err.message);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno del servidor' });
});

/*
 * Arrancamos el servidor en el puerto 3000
 * Mostramos en consola que está corriendo
 */
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

