// Importamos Injectable para indicar que esta clase es un servicio que puede inyectarse en otros componentes o servicios
import { Injectable } from '@angular/core';
// Importamos HttpClient para realizar peticiones HTTP (GET, POST, etc.)
import { HttpClient } from '@angular/common/http';
// Importamos Observable de RxJS para manejar respuestas asincrónicas y reactivas
import { Observable } from 'rxjs';

/**
 * @Injectable:
 * Decorador que indica que esta clase es un servicio inyectable.
 * providedIn: 'root' -> Hace que el servicio esté disponible en toda la aplicación sin necesidad de declararlo en providers.
 */
@Injectable({
  providedIn: 'root'
})
export class Service01 {
  
  /**
   * apiUrl:
   * URL base de la API que se va a consumir.
   * En este ejemplo, estamos usando el endpoint de usuarios de jsonplaceholder.
   */
  //private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    private apiUrl = 'http://localhost:3000/usuarios';

  /**
   * Constructor:
   * Inyectamos HttpClient, el servicio de Angular para hacer peticiones HTTP.
   * Esto nos permite usar métodos como get(), post(), put() y delete().
   */
  constructor(private http: HttpClient) {}

  /**
   * getUsuarios:
   * Realiza una petición GET para obtener una lista de usuarios desde la API.
   * @returns Observable<any[]> -> Observable que emite un arreglo de usuarios.
   */
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * crearUsuario:
   * Realiza una petición POST para enviar un nuevo usuario a la API.
   * @param usuario - Objeto con los datos del usuario que queremos crear.
   * @returns Observable<any> -> Observable que emite la respuesta de la API.
   */
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}
