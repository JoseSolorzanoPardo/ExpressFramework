**Objetivo min Proyecto:**  
Desarrollar un sistema básico de gestión de usuarios utilizando Node.js con el framework Express y MongoDB como base de datos. El sistema implementará autenticación segura mediante JSON Web Tokens (JWT) y control de acceso basado en roles (admin, user).

**Descripción General:**  
El sistema permitirá a los administradores y usuarios autenticados realizar las siguientes operaciones:

1. **Autenticación:**
    - Inicio de sesión mediante credenciales (username y password) para obtener un token JWT válido por un tiempo determinado.
    - Generación del token JWT firmado digitalmente para identificar de forma segura al usuario autenticado.
2. **Gestión de Usuarios:**
    - Los administradores pueden crear nuevos usuarios proporcionando su username, password y rol (admin/user).
    - Visualización de todos los usuarios registrados, incluyendo su username, rol y fecha de creación (sin mostrar contraseñas).
3. **Control de Acceso:**
    - Uso de middleware para verificar la validez del token JWT en cada solicitud protegida.
    - Restricción para que solo los usuarios con rol admin puedan crear nuevos usuarios.
    - Permitir que usuarios autenticados con roles válidos (admin/user) accedan a la lista de usuarios.

**Tecnologías Utilizadas:**

- Node.js con Express para el servidor y las rutas.
- MongoDB con Mongoose para la base de datos y el modelado de esquemas.
- JSON Web Tokens (JWT) para la autenticación y autorización.

```
1.Paso Creacion de usuario en Base de datos

--use usuarios
--db.createCollection("users")

--Estructura Colecci贸n
{
  "_id": ObjectId,
  "username": String (煤nico y requerido),
  "password": String (hash almacenado),
  "role": String (valores posibles: "admin", "user"),
  "createdAt": Date (fecha de creaci贸n)
}

--inserci贸n de un documento
db.users.insertOne({
  username: "admin",
  password: "admin123", // sin encriptar
  role: "admin",
  createdAt: new Date()
})
```
