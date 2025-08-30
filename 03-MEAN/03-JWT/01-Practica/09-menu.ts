import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Permite usar routerLink y router-outlet en la vista
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
