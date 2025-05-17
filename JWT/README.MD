# ¿Qué es JWT?

JWT significa JSON Web Token, y es un estándar abierto que se utiliza principalmente para autenticación y autorización en aplicaciones web.

Un JWT es un token en formato JSON que se codifica y se usa para transmitir información entre partes de manera segura y compacta.

**¿Para qué sirve?**

1. **Autenticación:**
    - Un usuario inicia sesión con su usuario/contraseña.
    - El backend valida las credenciales y devuelve un JWT.
    - Este token se guarda (en el navegador o app cliente) y se envía en cada solicitud para identificar al usuario.
2. **Autorización:**
    - El servidor puede validar el JWT para saber si un usuario tiene acceso a ciertos recursos.

**¿Cómo se ve un JWT?**

Tiene **tres partes**:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. <-- Header (encabezado)

eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6... <-- Payload (datos)

SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQ... <-- Signature (firma)

**⚙️ Componentes**

1. **Header:** Define el tipo de token (JWT) y el algoritmo usado (como HS256).
2. **Payload:** Los datos (claims), como userId, role, exp (fecha de expiración).
3. **Signature:** Es una firma digital que verifica que el token no ha sido modificado.

**¿Qué significa "firmar un token"?**

Firmar un token significa agregar una **firma digital** al contenido (el **payload**) para que el servidor pueda verificar que **no ha sido alterado**.

**Paso a paso del proceso de firma**

Supongamos que se pone a prueba el siguiente código esto:
```
const jwt = require('jsonwebtoken');
const payload = { usuario: 'jose', rol: 'admin' };
const CLAVE_SECRETA = 'mi_clave_secreta';
const token = jwt.sign(payload, CLAVE_SECRETA);
```
**Esto genera un token con tres partes:**

header.payload.signature

1. **Header** (encabezado):
2. {
3. "alg": "HS256",
4. "typ": "JWT"
5. }

→ Codificado en base64.

1. **Payload** (la información):
2. {
3. "usuario": "jose",
4. "rol": "admin"
5. }

→ Codificado en base64.

1. **Firma** (signature):  
    Aquí es donde entra la magia de la "firma":
2. signature = HMACSHA256(
3. base64UrlEncode(header) + "." + base64UrlEncode(payload),
4. CLAVE_SECRETA
5. )
    - Se toma el **header + payload** (ya codificados en base64).
    - Se les aplica una función criptográfica (HMAC con SHA256).
    - Se utiliza la **clave secreta como llave de cifrado**.
    - El resultado es un "hash" (cadena única) llamado **firma**.

Si alguien cambia el payload (por ejemplo, de "rol": "user" a "rol": "admin"), la firma **ya no coincide** y el token será **rechazado**.

“Imagina que tú escribes un mensaje en un papel (el payload) y lo pones dentro de un sobre (el token). Luego sellas el sobre con un sello de cera especial que solo tú tienes (la clave secreta).

Cuando alguien te devuelve el sobre (el token) y tú ves que el sello no está roto ni manipulado, confías en que el mensaje no ha sido alterado.  
Pero si el sello está diferente, sabes que alguien lo abrió o cambió el contenido.”

**¿Qué pasa si alguien intenta modificar el token?**

Aunque el token esté en texto legible (el payload está codificado pero no cifrado), **no puede modificarlo** porque:

- No tiene la clave secreta.
- No puede generar una firma válida nueva.
- El servidor al verificar con jwt.verify() verá que la firma **no coincide** y rechazará el token.
```
npm init -y
npm install express
npm install nodemon
npm install jsonwebtoken
```
