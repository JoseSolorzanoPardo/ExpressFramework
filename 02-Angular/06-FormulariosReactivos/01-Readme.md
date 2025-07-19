# ¿Qué es un formulario reactivo?

Un formulario reactivo en Angular es un tipo de formulario en el que la lógica, el estado y las validaciones se definen y controlan directamente desde el componente TypeScript, en lugar de depender principalmente del HTML

Modelo en el componente:

- Los campos del formulario (controles) se definen usando clases como FormGroup, FormControl o FormArray.
- Todo el estado del formulario (valores, validaciones, errores, estado "tocado") se maneja desde el TypeScript.

**Validaciones declarativas:**

- Se pueden agregar validaciones (como Validators.required o Validators.email) directamente en el código.
- Es fácil crear validadores personalizados.

Mayor control:

- Ideal para formularios dinámicos o que requieren lógica más compleja.

# ¿Qué es un FormControl?

Es una clase que representa un campo individual de un formulario en los formularios reactivos. Es la pieza más básica de la API de formularios reactivos, encargada de almacenar el valor, el estado y las validaciones de un único input (por ejemplo, un campo de texto, un checkbox o un número).

Puede tener **validaciones** (como requerido, email, longitud mínima, etc.).

# ¿Qué es un FormGroup?

Es una clase que representa un grupo de controles de formulario dentro de los formularios reactivos. Se usa para agrupar varios FormControl o incluso otros FormGroup, formando una estructura jerárquica que modela un formulario completo.

Es un contenedor lógico que encapsula el estado y las validaciones de varios campos (inputs).

# ¿Qué es un FormArray?

Es una clase de los formularios reactivos que representa una colección dinámica de controles de formulario (FormControl, FormGroup o incluso otros FormArray).

Se utiliza cuando necesitamos manejar listas de campos de forma dinámica, por ejemplo:

- Varios teléfonos de un usuario.
- Múltiples precios para un producto.
- Listas de tareas en un formulario.

# ¿Qué hace FormBuilder?

Es una clase proporcionada por el módulo @angular/forms. Simplifica la creación de estructuras de formulario que, sin FormBuilder, requerirían más código.
