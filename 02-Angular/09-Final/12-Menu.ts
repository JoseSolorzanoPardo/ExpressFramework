// ------------------------------------------------------------
// Importaciones necesarias
// ------------------------------------------------------------
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Permite usar routerLink y router-outlet en la vista
import { Router } from '@angular/router';        // Permite navegar programáticamente si es necesario

// ------------------------------------------------------------
// Decorador @Component → Configura el componente Angular
// ------------------------------------------------------------
@Component({
  selector: 'app-menu',           // Nombre del selector para usar este componente en HTML
  imports: [RouterModule],        // Importamos RouterModule para usar enlaces de navegación en el HTML
  templateUrl: './menu.html',     // Plantilla HTML asociada al menú
  styleUrl: './menu.css'          // Estilos CSS específicos para el menú
})
export class Menu {
  // ------------------------------------------------------------
  // Clase vacía por ahora
  // ------------------------------------------------------------
  // Actualmente el menú solo será estático y no requiere lógica.
  // Pero se podría usar el constructor con Router si se quiere:
  //
  // constructor(private router: Router) {}
  //
  // También podrías agregar métodos como:
  // irAProductos() {
  //   this.router.navigate(['/productos']);
  // }
}
