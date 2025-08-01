// ------------------------------------------------------------
// Importaciones necesarias
// ------------------------------------------------------------
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// ------------------------------------------------------------
// Definición de interfaz Producto
// ------------------------------------------------------------
// Esto permite definir la forma exacta que debe tener un producto.
// Da tipado fuerte para prevenir errores.
interface Producto {
  nombre: string;     // Nombre del producto
  descripcion: string;// Descripción breve del producto
  precio: number;     // Precio en número
  stock: number;      // Cantidad disponible en inventario
  imagen: string;     // URL de imagen para mostrar
  enlace: string;     // Enlace web relacionado (compra o información)
}

// ------------------------------------------------------------
// Decorador @Component → Configura este componente Angular
// ------------------------------------------------------------
@Component({
  selector: 'app-productos-component',              // Etiqueta HTML para usar este componente
  imports: [CommonModule],                          // Módulo básico de Angular para *ngFor, *ngIf, etc.
  templateUrl: './productos-component.html',        // Plantilla HTML asociada
  styleUrl: './productos-component.css'             // Estilos CSS asociados
})
export class ProductosComponent {

  // ------------------------------------------------------------
  // Arreglo de productos
  // ------------------------------------------------------------
  // Se define un arreglo de objetos Producto con datos estáticos.
  // En un caso real, estos datos vendrían de un servicio HTTP.
  productos: Producto[] = [
    {
      nombre: 'Laptop Dell XPS 13',
      descripcion: 'Core i7, 16GB RAM, 512GB SSD, pantalla InfinityEdge',
      precio: 4200,
      stock: 5,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: 'https://www.dell.com'
    },
    {
      nombre: 'Mouse Logitech MX Master 3',
      descripcion: 'Inalámbrico, ergonómico, recargable vía USB-C',
      precio: 120,
      stock: 20,
      imagen: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg',
      enlace: 'https://www.logitech.com'
    },
    {
      nombre: 'Monitor Samsung 27"',
      descripcion: 'Resolución QHD, 144Hz, curvo',
      precio: 1500,
      stock: 8,
      imagen: 'https://m.media-amazon.com/images/I/71MlcO29QOL._AC_SL1500_.jpg',
      enlace: 'https://www.samsung.com'
    },
    {
      nombre: 'Teclado Mecánico HyperX',
      descripcion: 'Switch Blue, retroiluminado RGB',
      precio: 300,
      stock: 15,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: 'https://www.hyperx.com'
    },

    // --- Productos adicionales con imagen genérica ---
    {
      nombre: 'Audífonos Bluetooth',
      descripcion: 'Sonido envolvente, batería de 20 horas',
      precio: 80,
      stock: 25,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Cámara Web HD',
      descripcion: '1080p, micrófono integrado',
      precio: 60,
      stock: 12,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Tablet Android 10"',
      descripcion: 'Octa-Core, 4GB RAM, 64GB almacenamiento',
      precio: 200,
      stock: 10,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Smartwatch Deportivo',
      descripcion: 'GPS, monitor de ritmo cardíaco',
      precio: 150,
      stock: 18,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Memoria USB 64GB',
      descripcion: 'USB 3.0, alta velocidad',
      precio: 15,
      stock: 50,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Disco Duro Externo 1TB',
      descripcion: 'Portátil, USB-C',
      precio: 90,
      stock: 22,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Silla Gamer',
      descripcion: 'Ajustable, soporte lumbar',
      precio: 250,
      stock: 7,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Router WiFi 6',
      descripcion: 'Velocidad hasta 1.8Gbps',
      precio: 130,
      stock: 9,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Lámpara LED Escritorio',
      descripcion: 'Regulable, luz blanca y cálida',
      precio: 35,
      stock: 30,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    },
    {
      nombre: 'Cargador Inalámbrico',
      descripcion: 'Compatible con Android y iPhone',
      precio: 25,
      stock: 40,
      imagen: 'https://img.freepik.com/free-vector/red-product-sale-tags_78370-1272.jpg',
      enlace: '#'
    }
  ];
}
