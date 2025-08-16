//  Importaciones necesarias
import { Component, OnInit } from '@angular/core'; // Para crear un componente y usar hook de inicialización
import { SucursalesService, Sucursal } from '../../services/sucursales-service'; // Servicio e interfaz del modelo de datos
import { CommonModule } from '@angular/common'; // Módulo común de Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)] y formularios template-driven

//  Decorador que define metadatos del componente
@Component({
  selector: 'app-sucursales-component', // Nombre para usar este componente en HTML (<app-sucursales-component>)
  imports: [CommonModule, FormsModule], // Importa módulos necesarios para directivas y formularios
  templateUrl: './sucursales-component.html', // Archivo de plantilla HTML asociado
  styleUrl: './sucursales-component.css', // Archivo CSS asociado
})
export class SucursalesComponent implements OnInit {
  //  Lista de sucursales cargadas desde el backend
  sucursales: Sucursal[] = [];

  //  Sucursal en modo de edición
  sucursalEditando: Sucursal | null = null;

  //  Inyección del servicio de sucursales
  constructor(private sucursalesService: SucursalesService) {}

  //  Se ejecuta al cargar el componente
  ngOnInit(): void {
    this.cargarSucursales();
  }

  //  Obtener lista actualizada de sucursales
  cargarSucursales(): void {
    this.sucursalesService.getSucursales().subscribe({
      next: (data) => (this.sucursales = data), // Asigna la lista recibida al arreglo
      error: (err) => console.error('Error al cargar sucursales:', err),
    });
  }

  //  Eliminar sucursal con confirmación
  eliminarSucursal(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta sucursal?')) {
      this.sucursalesService.deleteSucursal(id).subscribe({
        next: (res) => {
          console.log(res.message); // Mensaje de confirmación del backend
          this.cargarSucursales(); // Recargar la lista tras eliminar
        },
        error: (err) => console.error('Error al eliminar sucursal:', err),
      });
    }
  }

  // 🖊 Abrir formulario para editar una sucursal
  abrirFormularioEdicion(sucursal: Sucursal): void {
    this.sucursalEditando = { ...sucursal }; // Se clona para evitar modificar el original directamente
  }

  //  Guardar cambios realizados en la sucursal editada
  guardarEdicion(): void {
    if (!this.sucursalEditando) return;

    this.sucursalesService
      .updateSucursal(this.sucursalEditando._id, this.sucursalEditando)
      .subscribe({
        next: () => {
          this.cargarSucursales(); // Actualiza la lista
          this.sucursalEditando = null; // Cierra el modo edición
        },
        error: (err) => console.error('Error al editar sucursal:', err),
      });
  }

  //  Cancelar la edición
  cancelarEdicion(): void {
    this.sucursalEditando = null;
  }
}
