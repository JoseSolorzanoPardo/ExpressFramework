// Importa el decorador Component para definir un componente en Angular
import { Component } from '@angular/core';

// Importa el módulo de enrutamiento necesario para manejar rutas dentro del componente standalone
import { RouterModule } from '@angular/router';

// Importa la clase Router que permite la navegación programática entre rutas
import { Router } from '@angular/router';


// Define el componente principal de la aplicación
@Component({
  // Nombre del selector HTML que se usará para renderizar este componente
  selector: 'app-root',

  // Módulos que se importan específicamente para este componente standalone
  imports: [RouterModule],

  // Ruta del archivo de plantilla HTML asociado a este componente
  templateUrl: './app.html',

  // Ruta del archivo de estilos CSS asociado a este componente
  styleUrl: './app.css'
})
export class App {
  // Propiedad protegida que almacena el título de la aplicación
  protected title = 'Testing Module Route';

  // Constructor que inyecta el servicio Router para usarlo en la navegación
  constructor(private router: Router) {}

  // Método público que recibe un string y navega a la ruta correspondiente
  irAPagina(pagina: string) {
    this.router.navigate([pagina]);
  }
}
