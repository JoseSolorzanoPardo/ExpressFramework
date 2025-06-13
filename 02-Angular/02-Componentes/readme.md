# ¿Qué es un componente en Angular?

Un componente en Angular es una unidad funcional y visual reutilizable que combina:

- una vista (HTML),
- una lógica (TypeScript),
- y unos estilos (CSS),  
    para representar una parte de la interfaz de usuario de la aplicación.

## Ejemplo en términos sencillos

Si tu aplicación fuera una página de red social, podrías tener:

- Un componente para el menú (&lt;app-menu&gt;),
- Otro para las publicaciones (&lt;app-post&gt;),
- Otro para los comentarios (&lt;app-comentario&gt;).

Cada uno es un componente aislado, reutilizable y enfocado en una sola tarea.

## Características clave

- **Reutilizable**: Puedes usarlo muchas veces.
- **Encapsulado**: Cada componente tiene su propia lógica y estilo.
- **Modular**: Angular organiza la app por componentes.
- **Interactivo**: Permite entrada/salida de datos con @Input() y @Output().


```
ng new 02-starter

✔ Do you want to create a 'zoneless' application without zone.js (Developer Preview)? No

✔ Which stylesheet format would you like to use? CSS \\\[ &lt;<https://developer.mozilla.org/docs/Web/CSS>&gt;

\\\]

✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No

**ng generate component &lt;<Component name&gt;>**

ng serve

```
