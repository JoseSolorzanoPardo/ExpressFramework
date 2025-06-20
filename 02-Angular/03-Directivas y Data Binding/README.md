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

npm install Bootstrap

En angular.json, agregar:

"styles": \[

"node_modules/bootstrap/dist/css/bootstrap.min.css",

"src/styles.css"

\]

Ya con esto tendríamos Bootstrap instalado en nuestro proyecto.

## ¿Qué es una directiva?

En Angular, una directiva es una instrucción que puedes aplicar a elementos HTML para modificar su comportamiento o apariencia.

Por lo tanto, una directiva es como un comando especial que afecta cómo se renderiza o se comporta un elemento en la interfaz.

**1\. Directivas estructurales**

Cambian la estructura del DOM (agregar o quitar elementos). Ejemplos:

- ngIf → muestra u oculta elementos.
- ngFor → repite un elemento por cada item de una lista.
- ngSwitch → muestra diferentes bloques dependiendo de un valor.

**2\. Directivas de atributo**

Cambian la apariencia o el comportamiento de un elemento. Ejemplos:

- ngClass → aplica clases CSS condicionalmente.
- ngStyle → aplica estilos en línea.
- \[(ngModel)\] → enlaza datos a un input.

## ¿Qué es Data Binding?

Data Binding es la forma de conectar los datos del componente (TypeScript) con el DOM (HTML). Esto permite que los datos fluyan entre la lógica de la aplicación y la interfaz de usuario.

| **Tipo** | **Sintaxis** | **Ejemplo del uso anterior** | **¿Qué hace?** |
| --- | --- | --- | --- |
| _Interpolación_ | {{ variable }} | {{ curso.nombre }} | Muestra datos del componente en el HTML |
| _Property Binding_ | \[property\]="valor" | \[ngStyle\]="{ color: obtenerColor(...) }" | Asigna valores a propiedades del DOM |
| _Event Binding_ | (evento)="función()" | No lo usamos aún, pero sería (click)="eliminar()" | Ejecuta funciones del componente desde la vista |
| _Two-way Binding_ | \[(ngModel)\]="variable" | \[(ngModel)\]="nombreCurso" | Conecta una variable del componente y el input en ambas direcciones |
