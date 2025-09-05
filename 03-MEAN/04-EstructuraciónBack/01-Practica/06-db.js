//  Importamos Mongoose, el ODM que nos permite interactuar con MongoDB de forma orientada a objetos
const mongoose = require('mongoose');

//  Función asíncrona para conectar a la base de datos
const connectDB = async () => {
  try {
    //  Conectamos a MongoDB usando la URI definida en el archivo .env (process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);

    //  Si la conexión es exitosa, mostramos un mensaje en consola
    console.log(' Conectado a MongoDB');
  } catch (error) {
    //  Si hay un error durante la conexión, lo mostramos en consola
    console.error(' Error conectando a MongoDB', error);

    //  Cerramos el proceso si no se puede conectar (evita que la app siga corriendo sin DB)
    process.exit(1);
  }
};

//  Exportamos la función para poder usarla en otros archivos (como en server.js)
module.exports = connectDB;
