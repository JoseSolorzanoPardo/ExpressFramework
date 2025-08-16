//  Importaciones necesarias de Angular y RxJS
import { Injectable } from '@angular/core'; // Permite que este servicio pueda inyectarse en otros componentes
import { HttpClient } from '@angular/common/http'; // Servicio para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Representa respuestas asíncronas (como promesas, pero más potentes)

//  Interfaz que representa la estructura completa de una sucursal (incluye _id y createdAt que vienen del backend)
export interface Sucursal {
  _id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono?: string; // opcional
  estado: 'activa' | 'inactiva'; // enum restringido
  createdAt: string; // fecha de creación
}

//  Interfaz para la creación de una sucursal (sin _id ni createdAt porque los genera el backend)
export interface SucursalCreate {
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono?: string;
  estado: 'activa' | 'inactiva';
}

//  Decorador que hace que este servicio esté disponible a nivel global (root injector)
@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  
  //  URL base del backend (cambia si está en producción o hosting remoto)
  private baseUrl = 'http://localhost:3000/api/sucursales';

  //  Inyecta HttpClient para hacer peticiones al servidor
  constructor(private http: HttpClient) { }

  //  GET: Obtener todas las sucursales
  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.baseUrl);
  }

  //  DELETE: Eliminar una sucursal por su ID
  deleteSucursal(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete/${id}`);
  }

  //  POST: Crear una nueva sucursal
  createSucursal(sucursal: SucursalCreate): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${this.baseUrl}/guardar`, sucursal);
  }

  //  PUT: Actualizar una sucursal (puede ser parcial)
  updateSucursal(id: string, sucursal: Partial<Sucursal>): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this.baseUrl}/update/${id}`, sucursal);
  }
}
