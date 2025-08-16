import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Permite usar routerLink y router-outlet en la vista


@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

}
