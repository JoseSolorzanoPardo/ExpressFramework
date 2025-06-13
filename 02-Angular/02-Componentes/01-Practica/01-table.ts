// Importa el decorador Component de Angular para definir un componente.
import { Component } from '@angular/core';

// Importa CommonModule para poder usar directivas comunes como *ngFor y *ngIf en la plantilla.
import { CommonModule } from '@angular/common';

// Define un componente Angular usando el decorador @Component
@Component({
  // Este será el nombre del selector que se usará en la plantilla HTML para representar este componente.
  selector: 'app-table',

  // Aquí se indican los módulos que este componente necesita (en este caso, CommonModule para *ngFor y *ngIf).
  imports: [CommonModule],

  // Ruta del archivo HTML que define la vista (plantilla) de este componente.
  templateUrl: './table.html',

  // Ruta del archivo CSS que contiene los estilos específicos para este componente.
  styleUrl: './table.css' 
})

// Se define la clase del componente. Angular utiliza esta clase para manejar su comportamiento.
export class Table {

  // Se declara un arreglo de objetos llamado 'usuarios', cada uno representando un usuario con id, nombre y correo.
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com' },
    { id: 2, nombre: 'Ana Gómez', correo: 'ana@example.com' },
    { id: 3, nombre: 'Carlos Ruiz', correo: 'carlos@example.com' },
    { id: 4, nombre: 'Carlos Ruiz', correo: 'carlos@example.com' }
  ];

}
