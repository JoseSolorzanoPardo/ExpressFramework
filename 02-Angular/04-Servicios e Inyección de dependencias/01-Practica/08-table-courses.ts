// Importamos el decorador Component para crear un componente de Angular.
import { Component } from '@angular/core';

// Importamos CommonModule para poder usar directivas como *ngFor y *ngIf en la plantilla HTML.
import { CommonModule } from '@angular/common';

// Importamos el servicio que proporciona la lista de cursos.
import { CoursesService } from '../../Services/courses-service';

// Definimos el componente utilizando el decorador @Component.
@Component({
  selector: 'app-table-courses',            // Selector que se usará en el HTML para incluir este componente.
  imports: [CommonModule],                  // Importamos CommonModule (necesario si el componente es standalone).
  templateUrl: './table-courses.html',      // Archivo HTML con la plantilla visual del componente.
  styleUrl: './table-courses.css'           // Archivo CSS con los estilos del componente.
})
export class TableCourses {

  // Variable que almacenará la lista de cursos obtenida desde el servicio.
  cursos: any[] = [];

  // Inyectamos el servicio CoursesService usando el sistema de inyección de dependencias.
  constructor(private coursesService: CoursesService) {
    // Llamamos al método getCourses() del servicio y asignamos el resultado a la propiedad `cursos`.
    this.cursos = this.coursesService.getCourses();
  }

  // Método auxiliar que retorna un color dependiendo del estado del curso.
  // Si el curso está activo, retorna 'green'; si no, retorna 'gray'.
  obtenerColorPorEstado(activo: boolean): string {
    return activo ? 'green' : 'gray';
  }
}
