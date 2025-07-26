# ¿Qué es HttpClient en Angular?

HttpClient es un servicio que provee Angular para interactuar con APIs a través del protocolo HTTP. Nos permite enviar peticiones HTTP (GET, POST, PUT, DELETE, etc.) de forma sencilla y tipada, sin tener que usar directamente XMLHttpRequest o fetch.

En pocas palabras: HttpClient es la forma recomendada en Angular para consumir APIs REST.

**¿Por qué es importante?**

- Permite **obtener datos** de un servidor (por ejemplo, una lista de usuarios).
- Permite **enviar datos** (por ejemplo, registrar un usuario nuevo).
- Facilita trabajar con **observables** (usando RxJS), lo cual es perfecto para manejar respuestas asincrónicas.

**4\. Tipos de peticiones comunes con HttpClient**

- **GET** → this.http.get(url)
- **POST** → this.http.post(url, body)
- **PUT** → this.http.put(url, body)
- **DELETE** → this.http.delete(url)

# JSON Server (la más popular y fácil)

Es una herramienta que crea una API REST fake a partir de un archivo JSON, en segundos.

**Pasos para usarlo:**

1. Instala JSON Server de forma global:
2. npm install json-server
3. Crear un archivo db.json con datos de prueba:
```
{ "usuarios": [

{ "id": 1, "name": "Juan", "email": "<juan@mail.com>" },

{ "id": 2, "name": "Ana", "email": "<ana@mail.com>" }

],

"comments": [

{ "id": 1, "name": "Comentario 1", "body": "Texto de comentario" }

]

}
```
1. Inicia el servidor:
```
   npx json-server --watch db.json --port 3000
```
3. Accede a los datos:
    - GET <http://localhost:3000/usuarios>
    - POST <http://localhost:3000/comments>

**Ventajas:**

- No requiere configuración compleja.
- Soporta **GET, POST, PUT, DELETE** automáticamente.
- Muy rápido para prototipos.
