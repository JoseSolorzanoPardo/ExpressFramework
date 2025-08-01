// ------------------------------------------------------------
// Importaciones necesarias
// ------------------------------------------------------------
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para formularios reactivos
import { Productos, Producto } from '../../Services/productos';      // Servicio e interfaz de producto
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ------------------------------------------------------------
// Decorador @Component
// ------------------------------------------------------------
@Component({
  selector: 'app-productos-form',                   // Etiqueta para usar el componente en HTML
  imports: [CommonModule, ReactiveFormsModule],     // Módulos necesarios para plantillas y formularios
  templateUrl: './productos-form.html',             // Plantilla HTML asociada
  styleUrl: './productos-form.css'                  // Hoja de estilos asociada
})
export class ProductosForm {

  // ------------------------------------------------------------
  // Output para comunicación con componente padre
  // ------------------------------------------------------------
  @Output() productoAgregado = new EventEmitter<Producto>();
  // Este EventEmitter emitirá un producto recién agregado
  // para que el componente padre (por ejemplo, la tabla o lista) se actualice sin recargar.

  // ------------------------------------------------------------
  // Formulario reactivo
  // ------------------------------------------------------------
  productoForm!: FormGroup;

  // ------------------------------------------------------------
  // Constructor con inyección de dependencias
  // ------------------------------------------------------------
  constructor(
    private fb: FormBuilder,        // Creador de formularios reactivos
    private productosService: Productos // Servicio para comunicarse con el backend
  ) {
    // Inicializar formulario reactivo con valores por defecto y validaciones
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required], // Obligatorio
      descripcion: [''], // Opcional
      precio: [0, [Validators.required, Validators.min(1)]], // Obligatorio y mayor a 0
      stock: [0, [Validators.required, Validators.min(0)]],  // Obligatorio y no negativo
      imagen: [
        'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
        Validators.required
      ], // Obligatorio, con URL por defecto
      enlace: ['', Validators.required] // Obligatorio
    });
  }

  // ------------------------------------------------------------
  // Método para agregar un producto
  // ------------------------------------------------------------
  agregarProducto() {
    // Si el formulario no es válido, marcar todos los campos como tocados
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    // Convertir los datos del formulario a un objeto Producto
    const nuevoProducto = this.productoForm.value as Producto;

    // Llamar al servicio para agregar el producto
    this.productosService.addProducto(nuevoProducto).subscribe({
      next: (productoAgregado) => {
        alert('Producto agregado con éxito ✅');

        // Reiniciar formulario con valores por defecto para precio y stock
        this.productoForm.reset({ precio: 0, stock: 0 });

        // Emitir el producto agregado para que el componente padre se actualice
        this.productoAgregado.emit(productoAgregado);
      },
      error: (err) => {
        console.error('Error al agregar producto', err);
      }
    });
  }
}
