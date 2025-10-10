// Importa el decorador @Component para definir un componente Angular
import { Component } from '@angular/core';

// Importa RouterOutlet para permitir el enrutamiento dentro de este componente
import { RouterOutlet } from '@angular/router';

// Importa CommonModule para usar directivas como *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';

@Component({
  // Selector HTML que se usará en index.html → <app-root></app-root>
  selector: 'app-root',

  //  aquí se indican los módulos que se necesita
  imports: [RouterOutlet, CommonModule],

  // Ruta al archivo HTML que contiene la plantilla del componente
  templateUrl: './app.html',


  // Hoja de estilos utilizada
  styleUrl: './app.css',
})
export class App {
  // Variable protegida accesible desde el HTML del mismo componente
  public title = '02-starter';

  // Mensaje público que puede mostrarse directamente en el template
  public mensaje = 'Bienvenido a tu primera app Angular';

  // Array simple de strings, útil para recorrer con *ngFor
  public tecnologias: string[] = ['Angular', 'React', 'Vue', 'Svelte'];

  // Contador básico que se puede aumentar o disminuir desde botones
  public contador = 0;

  // Lista de objetos con nombre y versión, para mostrar o manipular en el HTML
  public tecnologias2 = [
    { nombre: 'Angular', version: '17.2.0' },
    { nombre: 'React', version: '18.2.0' },
    { nombre: 'Vue', version: '3.4.0' },
    { nombre: 'Svelte', version: '4.0.0' },
  ];

  // Método para eliminar un elemento del array tecnologias2 basado en su nombre
  eliminarTecnologia(nombre: string) {
    // Recorre todo el array buscando el objeto cuyo nombre coincida
    for (let i = 0; i < this.tecnologias2.length; i++) {
      console.log(this.tecnologias2[i].nombre); // imprime en consola el nombre

      // Si el nombre coincide, elimina ese objeto
      if (this.tecnologias2[i].nombre === nombre) {
        this.tecnologias2.splice(i, 1); // elimina el elemento por índice
        break; // sale del ciclo una vez eliminado
      }
    }
  }

  // Incrementa el contador en 1 (usado en un botón con (click))
  incrementar() {
    this.contador++;
  }

  // Decrementa el contador en 1
  decrementar() {
    this.contador--;
  }
}
