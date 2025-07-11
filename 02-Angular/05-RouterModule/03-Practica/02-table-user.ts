import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-user',
  imports: [CommonModule,RouterModule],
  templateUrl: './table-user.html',
  styleUrl: './table-user.css'
})
export class TableUser {

   usuarios: any[] = [];

    constructor(private usuariosService: UsuariosService) {
    // Obtenemos la lista de usuarios al momento de crear el componente (en el constructor).
    // El método obtenerUsuarios() retorna un arreglo de objetos con datos de usuario.
    this.usuarios = this.usuariosService.obtenerUsuarios();
  }

}
