// ------------------------------------------------------------
// Importación de Routes de Angular Router
// ------------------------------------------------------------
// Routes es el tipo que define el arreglo de rutas de nuestra aplicación.
// Cada ruta define un path (URL) y el componente que debe mostrarse.
import { Routes } from '@angular/router';

// ------------------------------------------------------------
// Importación de componentes que se usarán en las rutas
// ------------------------------------------------------------
import { ProductosApiComponent } from './Components/productos-api-component/productos-api-component';
import { ProductosComponent } from './Components/productos-component/productos-component';
import { ProductosForm } from './Components/productos-form/productos-form';
import { ProductosTabla } from './Components/productos-tabla/productos-tabla';

// ------------------------------------------------------------
// Definición de rutas de la aplicación
// ------------------------------------------------------------
export const routes: Routes = [

  // Ruta por defecto:
  // Cuando el usuario entra a la raíz del sitio (ej: http://localhost:4200/)
  // se redirige automáticamente a /productos-api
  { path: '', redirectTo: '/productos-api', pathMatch: 'full' },

  // Ruta que muestra la lista de productos obtenida desde el backend en cards
  { path: 'productos-api', component: ProductosApiComponent },

  // Ruta que muestra la lista de productos estáticos (no desde backend)
  { path: 'productos', component: ProductosComponent },

  // Ruta que muestra el formulario reactivo para agregar productos
  { path: 'productos-form', component: ProductosForm },

  // Ruta que muestra los productos en formato de tabla (CRUD)
  { path: 'productos-tabla', component: ProductosTabla }
];
