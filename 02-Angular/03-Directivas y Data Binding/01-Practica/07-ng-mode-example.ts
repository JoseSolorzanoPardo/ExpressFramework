// Importa el decorador Component para definir un componente Angular
import { Component } from '@angular/core';

// Importa FormsModule, necesario para usar [(ngModel)] en el template
import { FormsModule } from '@angular/forms';

// Decorador que define los metadatos del componente
@Component({
  selector: 'app-ng-model-example',          // Nombre del componente para usarlo como etiqueta <app-ng-model-example>
  imports: [FormsModule],                    // Importamos FormsModule para habilitar el uso de ngModel en plantillas
  templateUrl: './ng-model-example.html',    // Ruta al archivo HTML que contiene la vista del componente
  styleUrl: './ng-model-example.css'         // Ruta al archivo CSS con estilos personalizados
})
export class NgModelExample {
  
  // Propiedad que se enlazará con el input del HTML usando [(ngModel)]
  // Se inicializa como cadena vacía, y se actualizará automáticamente con lo que escriba el usuario
  nombreCurso: string = '';
}
