// Importa el tipo Routes desde el módulo de enrutamiento de Angular
import { Routes } from '@angular/router';

// Importa los componentes que serán utilizados en las rutas
import { Page01 } from './components/page01/page01';
import { Page02 } from './components/page02/page02';
import { Page03 } from './components/page03/page03';

// Define las rutas de la aplicación
export const routes: Routes = [
  // Ruta raíz ('') que carga por defecto el componente Page01
  { path: '', component: Page01 },

  // Ruta explícita 'page01' que también carga el componente Page01
  { path: 'page01', component: Page01 },

  // Ruta 'page02' que carga el componente Page02
  { path: 'page02', component: Page02 },

  // Ruta 'page03' que carga el componente Page03
  { path: 'page03', component: Page03 },
];
