Esctructura Propuesta
```
ProyectoCRUDMean/
│
├── models/
│   ├── sucursal.model.js
│   ├── sucursalEliminada.model.js
│   └── usuario.model.js
│
├── routes/
│   ├── sucursal.routes.js
│   └── auth.routes.js
│
├── controllers/
│   ├── sucursal.controller.js
│   └── auth.controller.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── config/
│   └── db.js
│
├── .env
├── server.js
└── package.json

```

```
/*
  dotenv es una librería que permite cargar variables de entorno definidas en un archivo `.env`
  dentro del objeto `process.env` de Node.js.

  Esto es útil para:
  - Separar la configuración del código fuente (por ejemplo, claves secretas, URL de base de datos, puertos)
  - Facilitar el cambio de entorno (desarrollo, pruebas, producción) sin modificar el código
  - Evitar exponer información sensible en el repositorio (usando .gitignore para excluir el archivo .env)

  Al ejecutar `require('dotenv').config();`, se cargan automáticamente todas las variables del archivo `.env`
  y se pueden usar en cualquier parte del proyecto a través de `process.env.<NOMBRE_VARIABLE>`

npm install dotenv

*/
```
