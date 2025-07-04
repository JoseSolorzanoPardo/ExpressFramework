// Importamos Component desde Angular core para definir un componente.
import { Component } from '@angular/core';

// Importamos el servicio que contiene la lógica para generar saludos personalizados.
import { SaludoService } from '../../Services/saludo-service';

// Decorador que define la configuración del componente.
@Component({
  selector: 'app-saludo-component',     // Selector HTML que se usará para incluir este componente en otras plantillas.
  imports: [],                          // No se importan módulos adicionales aquí porque no se están usando directivas externas por ahora.
  templateUrl: './saludo-component.html', // Ruta al archivo HTML que contiene la vista de este componente.
  styleUrl: './saludo-component.css'      // Ruta al archivo CSS que contiene los estilos para este componente.
})
export class SaludoComponent {

  // Variable pública que almacena el mensaje generado por el servicio.
  mensaje: string;

  // Inyectamos el servicio SaludoService mediante el constructor.
  // Angular se encarga de entregar la instancia adecuada (inyección de dependencias).
  constructor(private saludoService: SaludoService) {
    // Usamos el servicio para generar el saludo y lo asignamos a la variable `mensaje`.
    this.mensaje = this.saludoService.obtenerSaludo('Dev Senior');
  }
}
