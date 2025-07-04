// Importamos el decorador Injectable desde Angular Core.
// Esto permite que esta clase sea inyectada en otros componentes o servicios.
import { Injectable } from '@angular/core';

// Aplicamos el decorador @Injectable con la configuración 'providedIn: root'.
// Esto le dice a Angular que cree una única instancia (singleton) de este servicio
// y la comparta en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // Constructor vacío porque este servicio no necesita ninguna dependencia externa por ahora.
  constructor() { }

  // Método público que retorna un arreglo de cursos.
  // Cada curso es representado como un objeto con tres propiedades:
  // - nombre: el título del curso
  // - duracion: la duración estimada del curso
  // - activo: un booleano que indica si el curso está activo o no
  getCourses() {
    return [
      { nombre: 'Introducción a Angular', duracion: '20 horas', activo: true },
      { nombre: 'Spring Boot API REST', duracion: '30 horas', activo: true },
      { nombre: 'SQL Server Avanzado', duracion: '15 horas', activo: false },
      { nombre: 'React + Firebase', duracion: '25 horas', activo: true },
      { nombre: 'Fundamentos de DevOps', duracion: '10 horas', activo: false },
      { nombre: 'Git y GitHub para desarrolladores', duracion: '12 horas', activo: true },
      { nombre: 'Diseño de Interfaces con Figma', duracion: '18 horas', activo: true },
      { nombre: 'Python para Ciencia de Datos', duracion: '35 horas', activo: false }
    ];
  }
}
