// Importamos el decorador @Injectable desde el núcleo de Angular.
// Esto permite que Angular pueda inyectar esta clase como una dependencia.
import { Injectable } from '@angular/core';

// Decorador que convierte esta clase en un servicio inyectable.
// providedIn: 'root' hace que Angular registre este servicio automáticamente
// como un singleton en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  // Propiedad pública que almacena el mensaje a compartir entre componentes.
  // Se inicializa con un valor por defecto: "Mensaje inicial".
  mensaje = 'Mensaje inicial';

  // Constructor vacío. No hay dependencias a inyectar.
  constructor() { }

  // Método que actualiza el valor del mensaje.
  // Se usa cuando un componente quiere cambiar el mensaje compartido.
  setMensaje(nuevo: string) {
    this.mensaje = nuevo;
  }

  // Método que devuelve el valor actual del mensaje.
  // Se usa por componentes que necesitan leer el mensaje.
  getMensaje(): string {
    return this.mensaje;
  }
}
