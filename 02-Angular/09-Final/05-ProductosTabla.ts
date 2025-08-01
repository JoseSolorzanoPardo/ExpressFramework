// ------------------------------------------------------------
// Importaciones necesarias
// ------------------------------------------------------------

// Component y OnInit → Para definir un componente Angular y ejecutar código al inicializarlo
import { Component, OnInit } from '@angular/core';

// Importa el servicio Productos y la interfaz Producto para tipar datos
import { Productos, Producto } from '../../Services/productos';

// CommonModule → Permite usar directivas comunes como *ngFor, *ngIf en la plantilla
import { CommonModule } from '@angular/common';

// ------------------------------------------------------------
// Decorador @Component → Define la configuración del componente
// ------------------------------------------------------------
@Component({
  selector: 'app-productos-tabla', // Nombre que se usa en el HTML para llamar el componente
  imports: [CommonModule],        // Importa módulos que usará la vista
  templateUrl: './productos-tabla.html', // Ruta del archivo HTML asociado
  styleUrl: './productos-tabla.css'      // Ruta del archivo CSS asociado
})
export class ProductosTabla implements OnInit {

  // ------------------------------------------------------------
  // Variables del componente
  // ------------------------------------------------------------
  productos: Producto[] = []; // Arreglo para almacenar productos obtenidos del servicio
  loading = true;             // Bandera para mostrar estado de carga

  // ------------------------------------------------------------
  // Inyección de dependencias
  // ------------------------------------------------------------
  // Inyecta el servicio Productos para poder llamar a la API
  constructor(private productosService: Productos) {}

  // ------------------------------------------------------------
  // Método del ciclo de vida OnInit
  // ------------------------------------------------------------
  // Se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit(): void {
    this.obtenerProductos(); // Carga la lista de productos al iniciar
  }

  // ------------------------------------------------------------
  // Obtener todos los productos desde el backend
  // ------------------------------------------------------------
  obtenerProductos(): void {
    this.loading = true; // Muestra el estado de carga
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;  // Asigna los productos obtenidos al arreglo
        this.loading = false;   // Oculta el estado de carga
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
        this.loading = false;
      }
    });
  }

  // ------------------------------------------------------------
  // Eliminar un producto
  // ------------------------------------------------------------
  eliminarProducto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe({
        next: () => {
          // Filtra el producto eliminado de la lista local sin recargar la página
          this.productos = this.productos.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar producto', err);
        }
      });
    }
  }

  // ------------------------------------------------------------
  // Editar un producto
  // ------------------------------------------------------------
  editarProducto(producto: Producto): void {
    // Pide nuevo nombre
    const nuevoNombre = prompt('Nuevo nombre del producto:', producto.nombre);
    if (nuevoNombre === null || nuevoNombre.trim() === '') {
      return; // Usuario canceló o dejó vacío
    }

    // Pide nuevo precio
    const nuevoPrecio = prompt('Nuevo precio:', producto.precio.toString());
    if (nuevoPrecio === null || isNaN(+nuevoPrecio) || +nuevoPrecio <= 0) {
      return; // Usuario canceló o ingresó valor inválido
    }

    // Crea un objeto actualizado con los nuevos datos
    const actualizado: Producto = {
      ...producto,
      nombre: nuevoNombre,
      precio: +nuevoPrecio
    };

    // Llama al servicio para actualizar el producto
    this.productosService.updateProducto(actualizado).subscribe({
      next: () => {
        // Actualiza el producto en el arreglo local para que se vea el cambio
        const index = this.productos.findIndex(p => p.id === producto.id);
        if (index > -1) {
          this.productos[index] = actualizado;
        }
        alert('Producto actualizado con éxito ✅');
      },
      error: (err) => {
        console.error('Error al actualizar producto', err);
      }
    });
  }

}
