// Importamos Mongoose para definir el esquema del modelo
const mongoose = require('mongoose');

// Definimos el esquema para la colección de usuarios
const userSchema = new mongoose.Schema({
  // Campo: correo electrónico del usuario
  email: {
    type: String,         // Tipo de dato: texto
    required: true,       // Campo obligatorio
    unique: true,         // No se permiten correos duplicados
    trim: true            // Elimina espacios al inicio y final del valor
  },

  // Campo: contraseña del usuario
  password: {
    type: String,         // Tipo de dato: texto
    required: true        // Campo obligatorio
    // Nota: en producción se recomienda almacenar la contraseña en formato cifrado
  }
});

// Exportamos el modelo 'usuario' basado en el esquema definido
// Mongoose creará la colección 'usuarios' en la base de datos si no existe
module.exports = mongoose.model('usuario', userSchema);
