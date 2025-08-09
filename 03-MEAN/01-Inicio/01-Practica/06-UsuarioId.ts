import { Component } from '@angular/core';
import { UsuariosService, Usuario } from '../../services/usuarios-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-id',
  imports: [CommonModule],
  templateUrl: './usuario-id.html',
  styleUrl: './usuario-id.css'
})
export class UsuarioId {

    usuario?: Usuario; // Variable para guardar el usuario

  constructor(private usuariosService: UsuariosService) {}

  cargarUsuario(id: number) {
    this.usuariosService.getUsuarioPorId(id).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }
}
