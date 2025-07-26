// Importamos Component para definir un componente en Angular
import { Component } from '@angular/core';
// Importamos CommonModule para usar directivas comunes como *ngFor, *ngIf en la plantilla
import { CommonModule } from '@angular/common';

// Importamos OnInit para implementar el ciclo de vida de Angular (ngOnInit)
import { OnInit } from '@angular/core';
// Importamos nuestro servicio personalizado CommentsService, el cual maneja peticiones HTTP para comentarios
import { CommentsService } from '../../services/comments-service';

/**
 * @Component:
 * Decorador que define las propiedades del componente.
 * - selector: Nombre de la etiqueta HTML para usar el componente en la aplicación.
 * - imports: Módulos requeridos por el componente (CommonModule para directivas como *ngFor).
 * - templateUrl: Archivo HTML que contiene la plantilla del componente.
 * - styleUrl: Archivo CSS con los estilos del componente.
 */
@Component({
  selector: 'app-comments-component',
  imports: [CommonModule],
  templateUrl: './comments-component.html',
  styleUrl: './comments-component.css'
})
export class CommentsComponent implements OnInit {

  /**
   * comments:
   * Arreglo para almacenar los datos de los comentarios
   * que se obtendrán desde el servicio CommentsService.
   */
  comments: any[] = [];

  /**
   * Constructor:
   * Inyectamos el servicio CommentsService para poder
   * consumir su método getComments() y obtener los datos de la API.
   */
  constructor(private commentsService: CommentsService) {}

  /**
   * ngOnInit:
   * Método del ciclo de vida de Angular que se ejecuta
   * cuando el componente se inicializa.
   * Aquí se realiza la llamada al servicio para cargar los comentarios.
   */
  ngOnInit() {
    // Llamamos al servicio para obtener los comentarios de la API
    this.commentsService.getComments().subscribe(data => {
      // Asignamos los datos recibidos al arreglo comments
      this.comments = data;
    });
  }
}
