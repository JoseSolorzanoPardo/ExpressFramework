// Importa el decorador Component para definir el componente.
import { Component } from '@angular/core';

// Importa FormsModule para habilitar formularios basados en plantillas (template-driven forms).
import { FormsModule } from '@angular/forms';

@Component({
  // Selector personalizado para usar este componente en otras plantillas.
  selector: 'app-formulario-usuario',

  // Importa FormsModule para permitir el uso de [(ngModel)] en la plantilla HTML.
  imports: [FormsModule],

  // Enlace al archivo HTML que contiene la vista del componente (formulario).
  templateUrl: './formulario-usuario.html',


  styleUrl: './formulario-usuario.css' 
})
export class FormularioUsuario {

  // Objeto 'usuario' con propiedades enlazadas al formulario mediante [(ngModel)].
  usuario = {
    nombre: '',
    correo: ''
  };

  // Método que se ejecuta cuando se envía el formulario.
  enviar() {
    // Imprime los datos del usuario en la consola del navegador.
    console.log('Datos enviados:', this.usuario);
  }
}
