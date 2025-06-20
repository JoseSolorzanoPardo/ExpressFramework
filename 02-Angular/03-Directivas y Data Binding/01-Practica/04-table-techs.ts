// Importamos Component para definir un componente en Angular
import { Component } from '@angular/core';

// Importamos CommonModule para poder usar directivas estructurales como *ngIf y *ngFor en la plantilla HTML
import { CommonModule } from '@angular/common';

// Decorador @Component que define los metadatos del componente Angular
@Component({
  selector: 'app-table-techs',             // Nombre del componente, usado como etiqueta <app-table-techs>
  imports: [CommonModule],                 // Importación de CommonModule necesaria para usar *ngIf y *ngFor
  templateUrl: './table-techs.html',       // Ruta del archivo HTML con la estructura visual del componente
  styleUrl: './table-techs.css'            // Ruta del archivo de estilos CSS del componente
})
export class TableTechs {

  // Lista de tecnologías, cada una con un nombre y un tipo (Frontend, Backend, Base de Datos)
  // Esta estructura sirve como fuente de datos para una tabla en la plantilla HTML
  tecnologias = [
    { nombre: 'Angular', tipo: 'Frontend' },
    { nombre: 'Spring Boot', tipo: 'Backend' },
    { nombre: 'PostgreSQL', tipo: 'Base de Datos' },
    { nombre: 'React', tipo: 'Frontend' },
    { nombre: 'Node.js', tipo: 'Backend' },
    { nombre: 'Django', tipo: 'Backend' },
    { nombre: 'JSF', tipo: 'Backend' },
    { nombre: 'SQLite', tipo: 'Base de Datos' },
    { nombre: 'Laravel', tipo: 'Backend' },
    { nombre: 'MongoDB', tipo: 'Base de Datos' },
    { nombre: 'Vue.js', tipo: 'Frontend' },
    { nombre: 'Bootstrap', tipo: 'Frontend' }
  ];

}
