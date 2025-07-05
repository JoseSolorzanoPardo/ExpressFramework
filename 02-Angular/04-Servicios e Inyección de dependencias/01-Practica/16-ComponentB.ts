// Importamos el decorador @Component para definir un componente Angular.
import { Component } from '@angular/core';

// Importamos el servicio que contiene el mensaje compartido.
import { MensajeService } from '../../Services/mensaje-service';

// Decorador que define la configuración del componente.
@Component({
  selector: 'app-componente-b',           // Selector del componente, se usará como <app-componente-b></app-componente-b>
  imports: [],                            // No se importan módulos adicionales porque no se usan ngModel ni otras directivas especiales.
  templateUrl: './componente-b.html',     // Ruta al archivo HTML que contiene la vista.
  styleUrl: './componente-b.css'          // Ruta al archivo CSS que define los estilos del componente.
})
export class ComponenteB {

  // Propiedad pública que almacenará el mensaje obtenido desde el servicio.
  mensaje = '';

  // Inyectamos el servicio MensajeService mediante el constructor.
  // Angular proporciona automáticamente una instancia (singleton) de este servicio.
  constructor(private mensajeService: MensajeService) {}

  // Método que actualiza la propiedad `mensaje` llamando al método getMensaje() del servicio.
  // Este método puede ser llamado desde el HTML, por ejemplo, al hacer clic en un botón "Refrescar".
  actualizarVista() {
    this.mensaje = this.mensajeService.getMensaje();
  }
}
