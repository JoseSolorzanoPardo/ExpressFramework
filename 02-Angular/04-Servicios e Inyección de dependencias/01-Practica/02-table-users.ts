// Importamos el decorador Component desde Angular para definir un nuevo componente.
import { Component } from '@angular/core';

// Importamos CommonModule para habilitar directivas comunes como *ngIf y *ngFor en el HTML del componente.
import { CommonModule } from '@angular/common';

// Importamos el servicio UsuariosService que nos proveerá los datos de los usuarios.
import { UsuariosService } from '../../Services/usuarios-service';

// Definimos el componente con su configuración (selector, plantilla y estilos).
@Component({
  selector: 'app-table-users',         // Nombre del componente usado en HTML: <app-table-users></app-table-users>
  imports: [CommonModule],             // Importamos CommonModule para poder usar *ngFor y otras directivas en la plantilla.
  templateUrl: './table-users.html',   // Ruta del archivo HTML que define la vista del componente.
  styleUrl: './table-users.css'        // Ruta del archivo de estilos asociado al componente.
})
export class TableUsers {

  // Declaramos una variable pública para almacenar la lista de usuarios.
  // Se inicializa como un arreglo vacío.
  usuarios: any[] = [];

  // Inyectamos el servicio UsuariosService en el constructor mediante inyección de dependencias.
  // Angular detecta que esta clase necesita UsuariosService y se lo proporciona automáticamente.
  constructor(private usuariosService: UsuariosService) {
    // Obtenemos la lista de usuarios al momento de crear el componente (en el constructor).
    // El método obtenerUsuarios() retorna un arreglo de objetos con datos de usuario.
    this.usuarios = this.usuariosService.obtenerUsuarios();
  }
}
