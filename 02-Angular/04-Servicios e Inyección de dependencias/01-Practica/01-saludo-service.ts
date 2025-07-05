// Importamos el decorador @Injectable desde el núcleo de Angular.
// Esto indica que esta clase puede participar del sistema de inyección de dependencias.
import { Injectable } from '@angular/core';

// Aplicamos el decorador @Injectable a la clase del servicio.
// 'providedIn: root' le dice a Angular que este servicio estará disponible en toda la aplicación como un singleton.
@Injectable({
  providedIn: 'root'
})
export class SaludoService {

  // Constructor vacío. Aquí podrías inyectar otros servicios si fueran necesarios.
  constructor() { }

  // Método público que recibe un nombre y retorna un saludo personalizado.
  obtenerSaludo(nombre: string): string {
    return `Hola, ${nombre}! Bienvenido a la generación de servicios desde Angular.`;
  }
}
