// Importa el decorador Component de Angular para definir componentes.
import { Component } from '@angular/core';

// Importa CommonModule, que proporciona directivas básicas como *ngFor y *ngIf.
import { CommonModule } from '@angular/common';

// Define el componente con su metadata
@Component({
  // Nombre del selector que se usará en el HTML para representar este componente
  selector: 'app-table-areas',

  // Módulos que este componente requiere (por ejemplo, CommonModule para *ngFor)
  imports: [CommonModule],

  // Archivo HTML que representa la plantilla del componente (su vista)
  templateUrl: './table-areas.html',

  styleUrl: './table-areas.css' 
})

// Clase del componente, contiene la lógica y los datos
export class TableAreas {

  // Arreglo de objetos 'areas', cada uno representa una entidad con id, nombre y descripción
  areas = [
    {
      id: 1,
      nombre: 'Desarrollo de Software',
      descripcion: 'Encargada de crear y mantener aplicaciones'
    },
    {
      id: 2,
      nombre: 'Infraestructura',
      descripcion: 'Gestiona servidores, redes y sistemas'
    },
    {
      id: 3,
      nombre: 'Talento Humano',
      descripcion: 'Maneja procesos de personal y bienestar'
    },
    {
      id: 4,
      nombre: 'Finanzas',
      descripcion: 'Supervisa la contabilidad y presupuesto institucional'
    }];

