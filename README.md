# **Express.js Framework**

Es un framework (un conjunto de herramientas y librerías) para Node.js que facilita la creación de aplicaciones web y APIs (interfaces de programación de aplicaciones).  
Node.js por sí solo te permite ejecutar JavaScript en el servidor, pero trabajar directamente con él puede ser muy manual y tedioso (por ejemplo, se tendria que programar a mano cómo responder a cada solicitud HTTP).  

![Gráfico explicativo](img/grafico1.png)

## Instalación de Express Framework

Al trabajar con Express.js, se necesita instalarlo primero en el proyecto, y eso se hace usando npm (Node Package Manager).

**_npm_** es el sistema de gestión de paquetes de Node.js. Con él puedes descargar e instalar librerías (como Express) de forma rápida.

Entonces el flujo sería:

1. Primero inicializas un proyecto nuevo Node.js (si aún no lo se ha hecho):

npm init -y

Esto crea un archivo package.json que lleva el control de las dependencias.

1. Luego instalas, **Express** con npm:

npm install express

Esto descarga Express y lo agrega a las dependencias del proyecto creado.

1. Después ya puedes usarlo en tu archivo JavaScript, así:

const expres = require('express');

const app = express();

**¿Qué hace npm aquí?**

- Se conecta al registro de paquetes de Node.js en Internet.
- Descarga Express y sus archivos necesarios.
- Lo guarda en una carpeta llamada node_modules.
- Registra Express en el package.json para que otros (o tú mismo) puedan reinstalar todas las dependencias fácilmente con npm install.

# Ejercicio Sencillo

![Gráfico explicativo](img/grafico2.png)

- Creamos un archivo index.js e involucramos a Express.
- Le decimos que cuando alguien visite la ruta '/' (inicio), responda con '¡Hola Mundo!'.
- Escuchamos en el puerto 3000 (es decir, el servidor queda disponible en [http://localhost:3000](http://localhost:3000/)).
- Node index.js

Ahora bien, el despliegue inicial de este proyecto tiene un problema dado que al hacer cambios sobre el index.js estos no se ven reflejados como tal se recomienda realizar en la carpeta del proyecto realizar la siguiente instalación:

- npm install -g nodemon
- nodemon index.js

![Gráfico explicativo](img/grafico3.png)

## ¿Qué es una "ruta" en Express?

![Gráfico explicativo](img/grafico4.png)

Una ruta es un camino de acceso al servidor. Cuando un navegador o cliente hace una petición a tu servidor (por ejemplo, entra a <http://localhost:3000/>), el desarrollador define qué debe responder mediante el servidor en función de la URL y del método HTTP (GET, POST, PUT, DELETE, etc.).

Una ruta en Express combina:

- Una URL (por ejemplo: /, /productos, /usuarios).
- Un método HTTP (por ejemplo: GET, POST).
- Una función que maneja la solicitud y da una respuesta.

![Gráfico explicativo](img/grafico5.png)

## ¿Qué es una petición POST?

- Una petición POST se usa para enviar datos al servidor.
- Generalmente, se usa para crear nuevos recursos (como crear un nuevo usuario, producto, pedido, etc.).
- En Express, puedes capturar los datos enviados desde el cliente (por ejemplo, de un formulario HTML o de una API frontend como React).

![Gráfico explicativo](img/grafico6.png)

Se declara la estructura de la petición POST por ejemplo de la siguiente forma (\`\` alt+96):

![Gráfico explicativo](img/grafico7.png)

## JSON

JSON significa JavaScript Object Notation. Es un formato de texto que se usa para almacenar y transmitir datos estructurados.

- Los datos están organizados en pares clave:valor (key: value).
- Las claves siempre van entre comillas dobles (" ").
- Los valores pueden ser: números, cadenas de texto, arreglos, objetos, true, false o null.
- Para enviar datos entre un cliente (como un navegador) y un servidor (como en Express). (intercambiar datos entre aplicaciones web y APIs.
- Para almacenar configuraciones (por ejemplo, package.json en proyectos de Node.js).
- Para guardar información en bases de datos modernas (como MongoDB).

![Gráfico explicativo](img/grafico8.png)

Como vamos a enviar una trama en formato JSON lo haremos con POSTMAN

{

&nbsp; "nombre": "Nathalia Jaramillo Carmona",

&nbsp; "edad": 28

}

![Gráfico explicativo](img/grafico9.png)

Ajustando nuestro código:

![Gráfico explicativo](img/grafico10.png)

# **¿Qué es una petición tipo PUT ?**

- Una petición PUT se usa principalmente para ACTUALIZAR información existente en un servidor.
- A veces también se usa para crear un recurso si no existe (pero su uso más típico es actualizar).

![Gráfico explicativo](img/grafico11.png)

Emulando el ejercicio en Postman:  

![Gráfico explicativo](img/grafico12.png)

## ¿Qué es un Middleware?

Un Middleware es simplemente una función que se ejecuta entre que el servidor recibe una solicitud (Request) y entrega una respuesta (Response). Palabras mas y menos un middleware hace referencia a un puente.

Un middleware puede:

- Leer la solicitud.
- Modificar la solicitud o la respuesta.
- Detener la solicitud.
- Redirigir a otro lugar.
- Pasar el control a otro middleware.

![Gráfico explicativo](img/grafico13.png)

## Middleware para Autenticación

Supongamos que se desea proteger ciertas rutas, solo permitiendo acceso si el usuario tiene un "token".

#### Pero antes ¿Qué es un header en una solicitud HTTP?

Un header (cabecera) es información adicional que se envía junto con una petición o una respuesta en HTTP.

- No es parte del cuerpo (body) de la solicitud.
- No es parte de la URL.
- Es como una tarjeta de presentación que da datos extra sobre la petición o la respuesta.

## Código de estado HTTP

| **Código** | **Significado** |
| --- | --- |
| 200 OK | Todo bien, respuesta exitosa. |
| 201 Created | Recurso creado exitosamente. |
| 400 Bad Request | Solicitud mal formada. |
| 401 Unauthorized | No autorizado, falta o es incorrecta la autenticación. |
| 403 Forbidden | Prohibido: aunque estés autenticado, **no tienes permisos**. |
| 404 Not Found | No encontrado, la ruta o recurso no existe. |
| 500 Internal Server Error | Error interno del servidor. |

![Gráfico explicativo](img/grafico14.png)

## Probando con Postman

![Gráfico explicativo](img/grafico15.png)

## Middleware para Validaciones

Sirve para validar los datos **antes** de llegar al controlador.

**¿Qué pasa aquí?**

- Antes de crear el usuario, validamos que tenga nombre y edad.
- Si falta algo, no deja pasar y manda error.
- Si todo está bien, deja que el servidor cree el usuario.

![Gráfico explicativo](img/grafico16.png)
