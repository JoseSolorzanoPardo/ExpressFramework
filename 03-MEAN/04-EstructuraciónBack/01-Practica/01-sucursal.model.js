// Importamos Mongoose, el ODM que nos permite definir esquemas y modelos para MongoDB
const mongoose = require('mongoose');

// Definimos el esquema de la colección "sucursales"
const sucursalSchema = new mongoose.Schema({
  // Campo: nombre de la sucursal
  nombre: { 
    type: String,            // Tipo de dato: cadena de texto
    required: true,          // Obligatorio
    unique: true,            // No se permiten duplicados
    trim: true               // Elimina espacios al inicio y al final
  },

  // Campo: dirección de la sucursal
  direccion: { 
    type: String, 
    required: true, 
    trim: true 
  },

  // Campo: ciudad en la que se encuentra la sucursal
  ciudad: { 
    type: String, 
    required: true, 
    trim: true 
  },

  // Campo: teléfono de contacto (opcional)
  telefono: { 
    type: String, 
    trim: true 
  },

  // Campo: estado de la sucursal (activa o inactiva)
  estado: { 
    type: String, 
    enum: ['activa', 'inactiva'], // Solo se permiten estos dos valores
    default: 'activa'             // Valor por defecto si no se especifica
  },

  // Campo: fecha de creación del documento
  createdAt: { 
    type: Date, 
    default: Date.now             // Se asigna la fecha actual automáticamente
  }
});

// Exportamos el modelo 'Sucursal' basado en el esquema definido
// Esto crea (si no existe) la colección "sucursals" en la base de datos
module.exports = mongoose.model('Sucursal', sucursalSchema);
