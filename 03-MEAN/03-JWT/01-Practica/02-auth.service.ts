// Importamos HttpClient para hacer peticiones HTTP (REST API al backend)
import { HttpClient } from '@angular/common/http';

// Injectable permite que este servicio se pueda inyectar en cualquier componente o servicio
import { Injectable } from '@angular/core';

// Observable (para manejar respuestas asíncronas) y tap (para ejecutar efectos secundarios)
import { Observable, tap } from 'rxjs';

// Decorador Injectable: el servicio estará disponible en toda la aplicación (root)
@Injectable({ providedIn: 'root' })
export class AuthService {
  // URL base de la API de autenticación (ajústala según el backend real)
  private apiUrl = 'http://localhost:3000/api/auth'; 

  // Se inyecta HttpClient en el constructor para hacer solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  // credentials: objeto con email y password
  // Retorna un Observable con la respuesta del backend
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Una vez recibida la respuesta, guardamos el token JWT en el localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Método para cerrar sesión: elimina el token del localStorage
  logout(): void {
    localStorage.removeItem('token');
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario está autenticado
  // Devuelve true si existe un token guardado, false si no
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
