// Importamos el decorador Component para definir un nuevo componente de Angular.
import { Component } from '@angular/core';

// Importamos CommonModule para poder usar directivas como *ngFor y *ngIf en la plantilla HTML.
import { CommonModule } from '@angular/common';

// Importamos el servicio que provee los datos de las tecnologías.
import { TechsServices } from '../../Services/techs-services';

// Definimos el componente usando el decorador @Component.
@Component({
  selector: 'app-table-techs',              // Selector que se usará en HTML para incluir este componente.
  imports: [CommonModule],                  // Módulo necesario si el componente es standalone y usa *ngFor, *ngIf, etc.
  templateUrl: './table-techs.html',        // Ruta al archivo HTML que contiene la vista del componente.
  styleUrl: './table-techs.css'             // Ruta al archivo CSS con los estilos del componente.
})
export class TableTechs {

  // Variable pública que almacena la lista de tecnologías obtenida del servicio.
  tecnologias: any[] = [];

  // Inyectamos el servicio TechsServices mediante el constructor.
  // Angular se encarga de entregar la instancia única (singleton).
  constructor(private techServices: TechsServices) {
    // Llamamos al método getTechs() del servicio y guardamos la respuesta en la propiedad `tecnologias`.
    this.tecnologias = this.techServices.getTechs();
  }

}
