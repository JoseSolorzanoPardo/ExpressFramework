// Importamos Mongoose para definir el esquema del documento
const mongoose = require('mongoose');

// Definimos el esquema para las sucursales eliminadas
const sucursalEliminadaSchema = new mongoose.Schema({
  // Campos básicos que se copian desde el documento original al momento de eliminar

  nombre: String,       // Nombre de la sucursal eliminada
  direccion: String,    // Dirección de la sucursal
  ciudad: String,       // Ciudad donde estaba ubicada
  telefono: String,     // Teléfono de contacto
  estado: String,       // Estado anterior (activa o inactiva)
  createdAt: Date,      // Fecha de creación original del documento

  // Campo adicional para saber cuándo se eliminó
  deletedAt: { 
    type: Date, 
    default: Date.now   // Se asigna automáticamente la fecha actual al eliminar
  }
});

// Exportamos el modelo 'sucursalEliminada'
// Esta colección se usa como respaldo de datos eliminados de la colección principal
module.exports = mongoose.model('sucursalEliminada', sucursalEliminadaSchema);
