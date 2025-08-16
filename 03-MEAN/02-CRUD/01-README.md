```
\# -------------------------------------------

\# Inicializa un nuevo proyecto Node.js

\# Crea automáticamente un archivo package.json con valores por defecto

\# El flag "-y" acepta todas las opciones por defecto sin hacer preguntas

npm init -y

\# -------------------------------------------

\# -------------------------------------------

\# Instala el framework Express.js

\# Express facilita la creación de servidores HTTP y APIs REST en Node.js

\# Se guarda como dependencia en package.json

npm install express

\# -------------------------------------------

\# -------------------------------------------

\# Instala nodemon como dependencia del proyecto

\# Nodemon reinicia automáticamente el servidor cada vez que detecta cambios

\# en los archivos, útil durante el desarrollo

npm install nodemon

\# -------------------------------------------

\# -------------------------------------------

\# Instala el paquete cors

\# CORS (Cross-Origin Resource Sharing) permite que tu API sea consumida

\# desde otros orígenes (dominios/puertos distintos) en el navegador

\# Sin esto, las peticiones entre frontend y backend en diferentes puertos serían bloqueadas

npm install cors

\# -------------------------------------------

/**
 * Mongoose es una librería ODM para MongoDB en Node.js.
 * Se instala con: npm install mongoose
 * 
 * Permite:
 * - Conectarse a MongoDB
 * - Definir esquemas y modelos
 * - Realizar operaciones CRUD de forma estructurada
 *
 * Ejemplo:
 * const mongoose = require('mongoose');
 * mongoose.connect('mongodb://localhost/mi_basedatos');
 */

npm install mongoose

```

## ¿Qué es Bootstrap?

Bootstrap es un _framework_ (marco de trabajo) de HTML, CSS y JavaScript que facilita el diseño y desarrollo de sitios web y aplicaciones web responsivas y con un diseño visual atractivo.

Características principales:

1. 🎨 Componentes predefinidos: botones, formularios, alertas, tarjetas, barras de navegación, etc.
2. 📱 Diseño responsivo: se adapta automáticamente a diferentes tamaños de pantalla (móvil, tablet, escritorio).
3. 🧱 Sistema de rejilla (grid): permite organizar el contenido en filas y columnas de forma flexible.
4. ⚙️ Fácil de usar: puede empezar solo con HTML básico y unas clases de CSS.
5. 🔧 Personalizable: puede modificar colores, tamaños, estilos, etc.

## Comparativa Angular Vs Bootstrap

**Bootstrap:**

- Tipo: Framework de diseño (CSS/JS).
- Uso: Mejora la apariencia visual de una aplicación (botones, formularios, diseño responsivo, etc.).
- Tecnología base: HTML, CSS y un poco de JavaScript.
- No maneja lógica ni datos, solo el diseño visual.

**Angular:**

- Tipo: Framework de aplicaciones web completas (Frontend, SPA).
- Uso: Desarrolla aplicaciones interactivas con componentes, servicios, rutas, formularios, etc.
- Tecnología base: TypeScript y JavaScript.
- Maneja lógica, datos, comunicación con backend, etc.

## ¿Cómo instalar Bootstrap en un proyecto de Angular?

Comando o sentencia npm:
```
npm install bootstrap
```
En angular.json, agregar:
```
"styles": [
"node_modules/bootstrap/dist/css/bootstrap.min.css",
"src/styles.css"
]
```
Ya con esto tendríamos Bootstrap instalado en nuestro proyecto.
