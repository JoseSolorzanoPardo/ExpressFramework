// -------------------------------------------
// Importamos Injectable para declarar un servicio en Angular
// e inject para inyección manual (en este caso no lo usamos directamente)
import { Injectable, inject } from '@angular/core';

// Importamos HttpClient para realizar peticiones HTTP al backend
import { HttpClient } from '@angular/common/http';

// Importamos Observable de RxJS, que representa una secuencia de datos
// en el tiempo (ideal para manejar respuestas asíncronas)
import { Observable } from 'rxjs';
// -------------------------------------------


// -------------------------------------------
// Definimos la interfaz Usuario para tipar los datos
// que recibiremos del backend
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  genero: 'Masculino' | 'Femenino' | string;
}
// -------------------------------------------


// -------------------------------------------
// Decorador @Injectable indica que esta clase es un servicio
// y que puede inyectarse en otros componentes o servicios
// providedIn: 'root' => Angular crea una única instancia (singleton)
// disponible en toda la aplicación
@Injectable({ providedIn: 'root' })
export class UsuariosService {

  // Constructor donde inyectamos HttpClient
  // para poder hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  // URL base del backend Express
  // Aquí está "hardcodeada", pero podría configurarse
  // en environment.ts para cambiar según el entorno
  private baseUrl = 'http://localhost:3000';

  // Método para obtener la lista de usuarios desde el backend
  // Devuelve un Observable que emitirá un array de Usuario
  getUsuarios(): Observable<Usuario[]> {
    // Realizamos la petición GET a /usuarios
    // y esperamos que el backend devuelva un array en formato JSON
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }


getUsuarioPorId(id: number): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`);
}
  
}
// -------------------------------------------
