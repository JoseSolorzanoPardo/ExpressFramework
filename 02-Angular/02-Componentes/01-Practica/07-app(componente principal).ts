// Importa el decorador @Component para definir componentes en Angular.
import { Component } from '@angular/core';

// Importa el componente Table (lista de usuarios).
import { Table } from './table/table';

// Importa el componente TableAreas (lista de áreas).
import { TableAreas } from './table-areas/table-areas';

// Importa el componente FormularioUsuario (formulario de usuario).
import { FormularioUsuario } from './formulario-usuario/formulario-usuario';

// Define el componente principal de la aplicación Angular.
@Component({
  // Nombre del selector que se usará en el HTML para representar este componente raíz.
  selector: 'app-root',

  // Indica que este componente es standalone (no depende de un módulo).
  standalone: true,

  // Lista de componentes que este componente importa y puede usar en su plantilla.
  imports: [Table, TableAreas, FormularioUsuario],

  // Archivo de plantilla HTML que define la vista de este componente.
  templateUrl: './app.html',

 
  styleUrl: './app.css' 
})
export class App {
  // Propiedad protegida del componente que almacena el título de la aplicación.
  protected title = '01-angular-lab-componentes';
}
