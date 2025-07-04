// Importamos el decorador Injectable desde el núcleo de Angular.
// Esto es necesario para que la clase pueda ser utilizada dentro del sistema de inyección de dependencias de Angular.
import { Injectable } from '@angular/core';

// Decorador que convierte esta clase en un servicio inyectable.
// 'providedIn: root' indica que el servicio se registrará automáticamente en el inyector raíz,
// lo que lo convierte en un singleton compartido en toda la aplicación.
@Injectable({
  providedIn: 'root',
})
export class TechsServices {

  // Constructor vacío. Aquí podrías inyectar otros servicios si fueran necesarios.
  constructor() {}

  // Método público que retorna un arreglo de objetos, donde cada objeto representa una tecnología.
  // Cada tecnología tiene dos propiedades:
  // - nombre: el nombre de la tecnología.
  // - tipo: la categoría a la que pertenece (Frontend, Backend, Base de Datos).
  getTechs() {
    return [
      { nombre: 'Angular', tipo: 'Frontend' },
      { nombre: 'Spring Boot', tipo: 'Backend' },
      { nombre: 'PostgreSQL', tipo: 'Base de Datos' },
      { nombre: 'React', tipo: 'Frontend' },
      { nombre: 'Node.js', tipo: 'Backend' },
      { nombre: 'Django', tipo: 'Backend' },
      { nombre: 'JSF', tipo: 'Backend' },
      { nombre: 'SQLite', tipo: 'Base de Datos' },
      { nombre: 'Laravel', tipo: 'Backend' },
      { nombre: 'MongoDB', tipo: 'Base de Datos' },
      { nombre: 'Vue.js', tipo: 'Frontend' },
      { nombre: 'Bootstrap', tipo: 'Frontend' },
    ];
  }
}
