// Importamos el decorador @Component y el CommonModule para poder usar directivas estructurales como *ngIf y *ngFor
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Decorador que define un componente de Angular
@Component({
  selector: 'app-table-courses',            // Nombre del componente como etiqueta HTML <app-table-courses>
  imports: [CommonModule],                  // Importación necesaria para poder usar *ngFor, *ngIf en el template
  templateUrl: './table-courses.html',      // Ruta del archivo HTML con la plantilla de este componente
  styleUrl: './table-courses.css'           // Ruta al archivo CSS que aplica estilos personalizados
})
export class TableCourses {

  // Lista de cursos, cada uno con:
  // - nombre: título del curso
  // - duracion: tiempo estimado del curso
  // - activo: estado booleano que indica si el curso está disponible o no
  cursos = [
    { nombre: 'Introducción a Angular', duracion: '20 horas', activo: true },
    { nombre: 'Spring Boot API REST', duracion: '30 horas', activo: true },
    { nombre: 'SQL Server Avanzado', duracion: '15 horas', activo: false },
    { nombre: 'React + Firebase', duracion: '25 horas', activo: true },
    { nombre: 'Fundamentos de DevOps', duracion: '10 horas', activo: false },
    { nombre: 'Git y GitHub para desarrolladores', duracion: '12 horas', activo: true },
    { nombre: 'Diseño de Interfaces con Figma', duracion: '18 horas', activo: true },
    { nombre: 'Python para Ciencia de Datos', duracion: '35 horas', activo: false }
  ];

  // Función que retorna un color en formato string dependiendo del estado 'activo' del curso
  // Si el curso está activo, retorna 'green'; si no, retorna 'gray'
  obtenerColorPorEstado(activo: boolean): string {
    return activo ? 'green' : 'gray';
  }

}
