// Importa el decorador Injectable de Angular para indicar que esta clase
// puede ser inyectada como servicio en otros componentes o servicios.
import { Injectable } from '@angular/core';

// Importa HttpClient para realizar peticiones HTTP a APIs o backends.
import { HttpClient } from '@angular/common/http';

// Importa Observable para manejar la programación reactiva y respuestas asíncronas.
import { Observable } from 'rxjs';

// ------------------------------------------------------------
// Interfaz Producto
// ------------------------------------------------------------
// Define la estructura de datos que representa un producto.
// Esto ayuda a que el código sea tipado y más seguro.
export interface Producto {
  id: number;           // Identificador único del producto
  nombre: string;       // Nombre del producto
  descripcion: string;  // Descripción breve
  precio: number;       // Precio en formato numérico
  stock: number;        // Cantidad disponible
  imagen: string;       // URL de imagen del producto
  enlace: string;       // URL para más información o compra
}

// ------------------------------------------------------------
// Decorador @Injectable
// ------------------------------------------------------------
// providedIn: 'root' indica que el servicio estará disponible
// de forma global en toda la aplicación sin necesidad de declararlo
// en providers manualmente.
@Injectable({
  providedIn: 'root'
})
export class Productos {
  
  // URL base de la API o del backend fake (json-server en este caso).
  // Aquí apunta a un endpoint que devuelve productos.
  private apiUrl = 'http://localhost:3000/Productos';

  // Constructor que recibe el HttpClient por inyección de dependencias.
  // Esto permite usar http para hacer solicitudes GET, POST, PUT, DELETE.
  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------
  // Método: getProductos
  // ------------------------------------------------------------
  // Retorna un Observable que emite un arreglo de productos.
  // Realiza una solicitud GET al endpoint de productos.
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // ------------------------------------------------------------
  // Método: getProducto
  // ------------------------------------------------------------
  // Recibe un ID y retorna un Observable que emite el producto correspondiente.
  // Realiza una solicitud GET al endpoint /Productos/{id}.
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // ------------------------------------------------------------
  // Método: addProducto
  // ------------------------------------------------------------
  // Recibe un producto y lo envía al backend para ser creado.
  // Realiza una solicitud POST al endpoint de productos.
  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // ------------------------------------------------------------
  // Método: updateProducto
  // ------------------------------------------------------------
  // Recibe un producto actualizado y lo envía al backend.
  // Realiza una solicitud PUT al endpoint /Productos/{id}.
  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto);
  }

  // ------------------------------------------------------------
  // Método: deleteProducto
  // ------------------------------------------------------------
  // Recibe un ID de producto y lo elimina del backend.
  // Realiza una solicitud DELETE al endpoint /Productos/{id}.
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
