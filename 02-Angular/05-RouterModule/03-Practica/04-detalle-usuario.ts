// Importa el decorador Component de Angular para definir el componente
import { Component } from '@angular/core';

// Importa el módulo CommonModule para usar directivas comunes como ngIf y ngFor
import { CommonModule } from '@angular/common';

// Importa ActivatedRoute para acceder a los parámetros de la ruta actual
import { ActivatedRoute } from '@angular/router';

// Importa el servicio personalizado que contiene la lógica para obtener la lista de usuarios
import { UsuariosService } from '../../services/usuarios-service';

@Component({
  // Selector que identifica este componente en el HTML
  selector: 'app-detalle-usuario',

  // Módulos que este componente standalone requiere para funcionar
  imports: [CommonModule],

  // Ruta al archivo HTML que representa la vista de este componente
  templateUrl: './detalle-usuario.html',

  // Ruta al archivo de estilos CSS asociado al componente
  styleUrl: './detalle-usuario.css'
})
export class DetalleUsuario {
  // Propiedad pública que almacenará el usuario encontrado por correo
  usuario: any;

  // Constructor que inyecta las dependencias necesarias:
  // - ActivatedRoute para acceder al parámetro de la URL
  // - UsuariosService para obtener la lista de usuarios
  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {
    // Se suscribe a los cambios del parámetro de la URL (correo)
    // Esto asegura que si el usuario cambia en la misma vista, se actualice sin necesidad de recargar
    this.route.paramMap.subscribe((params) => {
      const correo = params.get('correo'); // Extrae el valor del parámetro 'correo' de la URL
      // Busca en la lista de usuarios el que tenga ese correo y lo asigna a la propiedad 'usuario'
      this.usuario = this.usuariosService
        .obtenerUsuarios()
        .find((u) => u.correo === correo);
    });
  }
}
