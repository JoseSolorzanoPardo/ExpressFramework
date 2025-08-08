import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService, Usuario } from '../../services/usuarios-service';

@Component({
  selector: 'app-usuarios-api',
  imports: [CommonModule],
  templateUrl: './usuarios-api.html',
  styleUrl: './usuarios-api.css'
})
export class UsuariosApi implements OnInit {

  /**
   * usuarios:
   * Arreglo que almacenará los datos de usuarios obtenidos del servicio.
   * Se inicializa como un arreglo vacío.
   */
  usuarios: any[] = [];

  /**
   * Constructor:
   * Inyectamos el servicio Service01 (en la variable usuariosService)
   * para poder consumir sus métodos (como getUsuarios()).
   */
  constructor(private usuariosService: UsuariosService) {}

  /**
   * ngOnInit:
   * Método del ciclo de vida de Angular.
   * Se ejecuta automáticamente cuando el componente ha sido inicializado.
   * Aquí hacemos una llamada al servicio para obtener los datos de usuarios.
   */
  ngOnInit() {
    // Suscripción al observable retornado por getUsuarios().
    // Cuando el observable emite datos (data), los asignamos a la variable usuarios.
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }
}
