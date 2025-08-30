// Importamos Component para definir el componente
import { Component } from '@angular/core';
// Importamos Router para redirigir después del login
import { Router } from '@angular/router';
// Importamos nuestro servicio de autenticación
import { AuthService } from '../../services/auth.service';
// CommonModule: para directivas básicas (ngIf, ngFor, etc.)
// FormsModule: para usar [(ngModel)] en el formulario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component', // Nombre del selector para usar este componente
  imports: [CommonModule, FormsModule], // Módulos necesarios
  templateUrl: './login-component.html', // Vista asociada
  styleUrl: './login-component.css' // Estilos asociados
})
export class LoginComponent {
  // Propiedades enlazadas al formulario con [(ngModel)]
  email = '';
  password = '';
  
  // Inyectamos el AuthService y el Router
  constructor(private authService: AuthService, private router: Router) {}

  // Método login que se ejecuta al enviar el formulario
  login(): void {
    // Llamamos al servicio AuthService enviando las credenciales
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      // Si el login es exitoso, navegamos a la ruta protegida (sucursales)
      next: () => this.router.navigate(['/menu-api/sucursales-api']),
      // Si hay error (ej: credenciales inválidas), mostramos alerta
      error: () => alert('Credenciales inválidas')
    });
  }
}
