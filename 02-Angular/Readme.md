# ¿Qué es Angular?

Angular es un framework de desarrollo web de código abierto creado por Google, utilizado para construir aplicaciones web de una sola página (SPA - Single Page Applications). Está escrito en TypeScript, un superset de JavaScript que añade tipado estático y otras características avanzadas.

## Características principales de Angular

- **Desarrollo basado en componentes:** Toda la interfaz de usuario se construye con componentes reutilizables.
- **Data Binding:** Permite sincronizar automáticamente el modelo (datos) y la vista (interfaz).
- **Inyección de dependencias:** Facilita la gestión de servicios y recursos compartidos entre componentes.
- **Ruteo (Routing):** Permite crear navegación entre páginas sin recargar el navegador.
- **CLI (Command Line Interface):** Angular ofrece una herramienta de línea de comandos que automatiza tareas comunes (crear componentes, servicios, compilar, servir, etc.).
- **Testing integrado:** Angular incluye soporte para pruebas unitarias y de integración desde el inicio.

## ¿Dónde se usa Angular?

Angular se usa en aplicaciones web interactivas y escalables. Es común en:

- Paneles administrativos
- Aplicaciones empresariales
- Sistemas de gestión ( CRM)
- Portales web institucionales

## ¿Qué es una SPA?

Una SPA (Single Page Applications) es una aplicación web que carga una sola página HTML y actualiza dinámicamente su contenido sin volver a cargar toda la página desde el servidor cada vez que el usuario navega.

## Requisitos de Instalación

**1\. Visual Studio Code (VS Code)**

Descárgalo desde: <https://code.visualstudio.com/>

**2\. Node.js (incluye npm)**

Angular requiere Node.js y su gestor de paquetes npm. Descarga desde: <https://nodejs.org/>

**3\. Angular CLI (herramienta de línea de comandos)**

Una vez se tenga Node.js, instala Angular CLI con:
```
npm install -g @angular/cli
```
Verificar instalación con:
```
ng version
```
**4\. Extensiones recomendadas en VS Code**

buscar estas extensiones en la pestaña de extensiones:

| **Extensión** | **¿Para qué sirve?** |
| --- | --- |
| Angular Language Service | Autocompletado y ayuda contextual para Angular |
| Prettier - Code formatter | Formateo automático de código |
| ESLint | Linter para mantener código limpio |
| Path Intellisense | Sugerencias de rutas de archivos |
| Angular Snippets (John Papa) | Fragmentos de código Angular |

# Descripción de las extensiones a instalar

**Angular Language Service** es una extensión para Visual Studio Code (y otros editores) que mejora la experiencia de desarrollo con Angular al proporcionar una inteligencia contextual dentro de los archivos Angular (.ts, .html), similar a lo que hacen los IDEs avanzados como IntelliJ o Visual Studio.

- **Autocompletado en plantillas:** Sugerencias de propiedades, variables y métodos disponibles en el componente.
- **Detección de errores:** Muestra errores de sintaxis o uso incorrecto de variables en HTML Angular.

**Prettier - Code formatter** es una **extensión que** sirve para **formatear automáticamente el código** según reglas predefinidas de estilo. Prettier garantiza que el código se vea limpio, uniforme y legible, sin importar quién lo escriba. Es especialmente útil en equipos de trabajo donde se quiere mantener consistencia en el estilo de código.

- Formatea automáticamente archivos .ts, .js, .html, .css, .json, .md, entre otros.
- Aplica estilos uniformes: sangrías, comillas, llaves, puntos y comas, espacios, saltos de línea, etc.

**ESLint** es una herramienta que se utiliza para analizar y encontrar problemas en el código JavaScript o TypeScript, especialmente errores de estilo y errores potenciales de lógica o sintaxis.

- **Detecta errores comunes** (por ejemplo: variables no usadas, funciones mal escritas, etc.)
- **Aplica reglas de estilo** (por ejemplo: comillas simples vs dobles, indentación, uso de const en vez de var)

**Angular Snippets (by John Papa)** es una extensión para Visual Studio Code que proporciona fragmentos de código reutilizable (snippets) específicos para Angular, lo que te permite escribir código más rápido y con menos errores.

Sirve para **automatizar la escritura de estructuras comunes** en Angular, como: Componentes, Servicios, Directivas, Pipes,Enrutamiento, Interpolaciones y bindings.

## Creación de un nuevo proyecto en Angular
```
ng new 02-starter

✔ Do you want to create a 'zoneless' application without zone.js (Developer Preview)? No

✔ Which stylesheet format would you like to use? CSS \[ <https://developer.mozilla.org/docs/Web/CSS>

\]

✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No

ng serve
```
## ¿Qué es zone.js?

zone.js es una librería que Angular ha usado tradicionalmente para detectar automáticamente los cambios en los datos y actualizar la vista (esto se llama _detección de cambios_). Es una funcionalidad experimental.

## Esctructura de un proyecto
```
03-starter/

├── .angular/ ← Configuración interna de Angular CLI (normalmente no se edita)

├── .vscode/ ← Configuración de tu editor VS Code (extensiones, ajustes, etc.)

├── node_modules/ ← Todas las dependencias instaladas vía npm

├── public/ ← (Puede estar vacía o ser usada para recursos públicos estáticos)

├── src/ ← Carpeta principal de tu código fuente

│ ├── app/ ← Tu aplicación Angular vive aquí (componentes, servicios, etc.)

│ ├── index.html ← Página HTML principal que se sirve (carga el Angular app)

│ ├── main.ts ← Punto de entrada de la app: aquí arranca Angular

│ └── styles.css ← Hoja de estilos global de la app

├── .editorconfig ← Reglas de estilo de código para editores

├── .gitignore ← Archivos/carpetas que Git debe ignorar (como \`node_modules\`)

├── angular.json ← Configuración del proyecto Angular (build, test, estilos, etc.)

├── package.json ← Lista de dependencias y scripts del proyecto

├── package-lock.json ← Detalle exacto de versiones instaladas de los paquetes

├── README.md ← Archivo de documentación inicial

├── tsconfig.json ← Configuración general de TypeScript

├── tsconfig.app.json ← Configuración TypeScript específica de la app Angular

├── tsconfig.spec.json ← Configuración TypeScript para pruebas unitarias (Jasmine/Karma)
```

**Nota:** una **directiva** es una instrucción especial que le dice al DOM (Document Object Model) cómo comportarse o cómo transformarse. Las directivas son una de las piezas clave del sistema de plantillas de Angular.
