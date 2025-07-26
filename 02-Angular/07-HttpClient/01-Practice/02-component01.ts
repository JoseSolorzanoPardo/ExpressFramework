// Importamos Component para definir un componente en Angular
import { Component } from '@angular/core';
// Importamos CommonModule para usar directivas comunes como *ngFor, *ngIf en la plantilla
import { CommonModule } from '@angular/common';

// Importamos OnInit para implementar el ciclo de vida de Angular (ngOnInit)
import { OnInit } from '@angular/core';
// Importamos nuestro servicio personalizado Service01, el cual maneja peticiones HTTP u operaciones de datos
import { Service01 } from '../../services/service01';

/**
 * Decorador @Component:
 * Define un componente standalone en Angular.
 * - selector: Nombre de la etiqueta HTML que representará el componente.
 * - imports: Módulos que el componente necesita (como CommonModule para *ngFor).
 * - templateUrl: Ruta del archivo HTML asociado al componente.
 * - styleUrl: Ruta del archivo CSS asociado al componente.
 */
@Component({
  selector: 'app-component01',
  imports: [CommonModule],
  templateUrl: './component01.html',
  styleUrl: './component01.css'
})
export class Component01 implements OnInit {

  /**
   * usuarios:
   * Arreglo que almacenará los datos de usuarios obtenidos del servicio.
   * Se inicializa como un arreglo vacío.
   */
  usuarios: any[] = [];

  /**
   * Constructor:
   * Inyectamos el servicio Service01 (en la variable usuariosService)
   * para poder consumir sus métodos (como getUsuarios()).
   */
  constructor(private usuariosService: Service01) {}

  /**
   * ngOnInit:
   * Método del ciclo de vida de Angular.
   * Se ejecuta automáticamente cuando el componente ha sido inicializado.
   * Aquí hacemos una llamada al servicio para obtener los datos de usuarios.
   */
  ngOnInit() {
    // Suscripción al observable retornado por getUsuarios().
    // Cuando el observable emite datos (data), los asignamos a la variable usuarios.
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }
}
