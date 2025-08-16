//  Importaciones necesarias
import { Component } from '@angular/core'; // Para definir un componente en Angular
import { SucursalesService, SucursalCreate } from '../../services/sucursales-service'; // Servicio e interfaz para crear una sucursal
import { CommonModule } from '@angular/common'; // Módulo común para usar directivas como *ngIf y *ngFor
import { FormsModule } from '@angular/forms'; // Para trabajar con formularios y [(ngModel)]

//  Decorador del componente
@Component({
  selector: 'app-sucursales-create', // Nombre del componente para usarlo en HTML
  imports: [CommonModule, FormsModule], // Módulos necesarios para la plantilla HTML
  templateUrl: './sucursales-create.html', // Ruta del archivo de plantilla HTML
  styleUrl: './sucursales-create.css', // Ruta del archivo de estilos CSS
  
})
export class SucursalesCreate {
  //  Objeto base que representa la nueva sucursal a registrar
  nuevaSucursal: SucursalCreate = {
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    estado: 'activa', // Valor por defecto
  };

  //  Variables para mostrar mensajes de retroalimentación (éxito o error)
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  //  Inyección del servicio de sucursales
  constructor(private sucursalesService: SucursalesService) {}

  //  Método que envía la nueva sucursal al backend
  crearSucursal(): void {
    this.sucursalesService.createSucursal(this.nuevaSucursal).subscribe({
      next: (data) => {
        //  Éxito: se muestra mensaje y se reinicia el formulario
        this.mensaje = ' Sucursal creada exitosamente.';
        this.tipoMensaje = 'success';

        // Reinicia el formulario
        this.nuevaSucursal = {
          nombre: '',
          direccion: '',
          ciudad: '',
          telefono: '',
          estado: 'activa',
        };

        //  Oculta el mensaje después de 4 segundos
        setTimeout(() => {
          this.mensaje = '';
          this.tipoMensaje = '';
        }, 4000);
      },
      error: (err) => {
        //  Error: se muestra mensaje de error
        console.error('Error al crear sucursal:', err);
        this.mensaje = ' Error al crear la sucursal. Intenta nuevamente.';
        this.tipoMensaje = 'error';

        //  Oculta el mensaje después de 4 segundos
        setTimeout(() => {
          this.mensaje = '';
          this.tipoMensaje = '';
        }, 4000);
      }
    });
  }
}
