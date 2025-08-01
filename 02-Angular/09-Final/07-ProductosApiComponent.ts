// ------------------------------------------------------------
// Importaciones necesarias
// ------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos el servicio Productos y la interfaz Producto
import { Productos, Producto } from '../../Services/productos';

// ------------------------------------------------------------
// Decorador @Component → Configura este componente Angular
// ------------------------------------------------------------
@Component({
  selector: 'app-productos-api-component',       // Nombre del selector para usar este componente en HTML
  imports: [CommonModule],                        // Permite usar directivas comunes (*ngIf, *ngFor, etc.)
  templateUrl: './productos-api-component.html',  // Ruta del archivo HTML de la vista
  styleUrl: './productos-api-component.css'       // Ruta del archivo CSS
})
export class ProductosApiComponent implements OnInit {

  // ------------------------------------------------------------
  // Variables del componente
  // ------------------------------------------------------------
  productos: Producto[] = []; // Lista que almacenará los productos obtenidos del backend
  loading = true;             // Indicador para mostrar un "spinner" mientras se cargan datos

  // ------------------------------------------------------------
  // Constructor con inyección de dependencias
  // ------------------------------------------------------------
  constructor(private productosService: Productos) {}

  // ------------------------------------------------------------
  // Método del ciclo de vida OnInit
  // ------------------------------------------------------------
  // Se ejecuta automáticamente cuando el componente se inicializa
  ngOnInit() {
    this.obtenerProductos(); // Llamada inicial para cargar productos desde el backend
  }

  // ------------------------------------------------------------
  // Obtener productos desde el backend
  // ------------------------------------------------------------
  obtenerProductos() {
    this.loading = true; // Activa el estado de carga

    // Llamamos al servicio para obtener productos
    this.productosService.getProductos().subscribe({
      // Si la respuesta es exitosa
      next: (data) => {
        this.productos = data; // Guardamos la lista de productos recibida
        this.loading = false;  // Ocultamos el spinner
      },
      // Si ocurre un error
      error: (err) => {
        console.error('Error al obtener productos', err);
        this.loading = false;  // Ocultamos el spinner
      }
    });
  }

  // ------------------------------------------------------------
  // Método llamado cuando el formulario emite un producto nuevo
  // ------------------------------------------------------------
  // Este método se usa en conjunto con el componente ProductosForm.
  // Cuando el formulario agrega un producto, lo recibimos aquí y lo añadimos a la lista local.
  onProductoAgregado(nuevo: Producto) {
    this.productos.push(nuevo);
  }

  /*
  ------------------------------------------------------------
  Código anterior (comentado) que hacía lo mismo pero sin
  separar la lógica de "obtenerProductos" en un método propio.
  ------------------------------------------------------------
  productos: Producto[] = [];
  loading = true;

  constructor(private productosService: Productos) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
        this.loading = false;
      }
    });
  }
  */
}
