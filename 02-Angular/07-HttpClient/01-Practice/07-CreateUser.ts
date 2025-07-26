// Importamos Component para definir un componente en Angular
import { Component } from '@angular/core';
// Importamos CommonModule para poder usar directivas estructurales como *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';
// Importamos FormsModule para poder usar ngModel (formulario template-driven)
import { FormsModule } from '@angular/forms';
// Importamos nuestro servicio que maneja las operaciones HTTP (GET, POST, etc.)
import { Service01 } from '../../services/service01';

/**
 * Decorador @Component:
 * Define un componente standalone.
 * - selector: Nombre de la etiqueta HTML personalizada para usar el componente.
 * - imports: Módulos requeridos por el componente.
 * - templateUrl: Ruta al archivo de la plantilla HTML.
 * - styleUrl: Ruta al archivo de estilos CSS.
 */
@Component({
  selector: 'app-create-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css'
})
export class CreateUser {

  /**
   * Objeto newUser:
   * Modelo de datos enlazado con el formulario.
   * name y email se llenarán con ngModel desde los inputs del formulario.
   */
  newUser = {
    name: '',
    email: ''
  };

  /**
   * Constructor:
   * Inyectamos el servicio Service01 para poder usar su método crearUsuario().
   */
  constructor(private userService: Service01) {}

  /**
   * Método createUser():
   * Se ejecuta al enviar el formulario.
   * - Verifica que los campos no estén vacíos.
   * - Envía una solicitud POST al servidor con los datos del nuevo usuario.
   * - Muestra mensaje de éxito o error.
   */
  createUser() {
    // Validación básica: campos obligatorios
    if (!this.newUser.name || !this.newUser.email) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    // Llamamos al servicio para hacer el POST
    this.userService.crearUsuario(this.newUser).subscribe({
      // Si la respuesta es exitosa
      next: (response) => {
        alert('Usuario creado con éxito');
        console.log('Respuesta del servidor:', response);
        // Limpiamos el formulario después de crear el usuario
        this.newUser = { name: '', email: '' };
      },
      // Si ocurre un error en la solicitud
      error: (err) => {
        console.error('Error al crear usuario:', err);
      }
    });
  }

}
