// Importamos el decorador @Component para definir un componente de Angular.
import { Component } from '@angular/core';

// Importamos el servicio que nos permite compartir el mensaje entre componentes.
import { MensajeService } from '../../Services/mensaje-service';

// Importamos FormsModule para usar [(ngModel)] en el HTML (data binding bidireccional).
import { FormsModule } from '@angular/forms';

// Definimos el componente con su configuración.
@Component({
  selector: 'app-componente-a',          // Selector del componente, se usará como <app-componente-a></app-componente-a>
  imports: [FormsModule],                // Importamos FormsModule para habilitar [(ngModel)] en la plantilla.
  templateUrl: './componente-a.html',    // Ruta a la plantilla HTML que representa la vista del componente.
  styleUrl: './componente-a.css'         // Ruta a la hoja de estilos CSS para este componente.
})
export class ComponenteA {

  // Propiedad que almacenará el valor del mensaje que el usuario escribe.
  nuevoMensaje = '';

  // Inyectamos el servicio MensajeService mediante el constructor.
  // Esto permite acceder a sus métodos y compartir el mensaje con otros componentes.
  constructor(private mensajeService: MensajeService) {}

  // Método que envía el mensaje al servicio usando el método setMensaje().
  // Este método es llamado desde la vista, cuando el usuario realiza alguna acción.
  enviarMensaje() {
    this.mensajeService.setMensaje(this.nuevoMensaje);
  }
}
