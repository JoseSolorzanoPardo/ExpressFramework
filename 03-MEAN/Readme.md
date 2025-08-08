# Creación de un Proyecto nuevo en Express

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
```

# Cross-Origin Resource Sharing

CORS significa Cross-Origin Resource Sharing (_Compartición de Recursos entre Orígenes Cruzados_).

Es un mecanismo de seguridad de los navegadores que permite o bloquea que una página web cargada desde un origen (protocolo + dominio + puerto) pueda hacer peticiones a otro origen distinto.

**Ejemplo rápido**

- **Frontend Angular:** <http://localhost:4200>
- **Backend Express:** <http://localhost:3000>

Aunque ambos estén en tu PC, el navegador los considera orígenes diferentes porque el puerto es distinto.  

Si intenta hacer una petición desde Angular al backend sin configurar CORS, el navegador la bloqueará.

**¿Por qué existe?**

Es una medida para evitar que un sitio malicioso pueda hacer peticiones a otro servidor usando la sesión del usuario sin su permiso (ataques tipo CSRF o Data Theft).

**¿Cómo funciona?**

Cuando el navegador detecta que una petición es a otro origen:

1. Envía una **petición previa** (OPTIONS) al servidor.
2. El servidor debe responder con **cabeceras CORS** como:
3. Access-Control-Allow-Origin: <http://localhost:4200>
4. Access-Control-Allow-Methods: GET, POST, PUT, DELETE
5. Access-Control-Allow-Headers: Content-Type
6. Si las cabeceras no permiten ese origen, el navegador **bloquea** la petición.

_“CORS es como el guardia de la puerta de tu API.  
Si tu frontend está en otra dirección, tienes que decirle al guardia que lo deje pasar, o el navegador bloqueará la entrada.”_
