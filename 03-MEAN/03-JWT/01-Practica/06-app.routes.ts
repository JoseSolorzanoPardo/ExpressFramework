// Importamos la interfaz Routes para definir las rutas de Angular
import { Routes } from '@angular/router';

// Importamos los componentes que estarán asociados a las rutas
import { SucursalesComponent } from './components/sucursales-component/sucursales-component';
import { SucursalesCreate } from './components/sucursales-create/sucursales-create';
import { Menu } from './components/menu/menu';
import { LoginComponent } from './components/login-component/login-component';

// Importamos el guard de autenticación para proteger rutas privadas
import { authGuard } from './auth/auth-guard';

// Definición de las rutas de la aplicación
export const routes: Routes = [
  // Ruta raíz: redirige al login
  { path: '', redirectTo: '/Login-api', pathMatch: 'full' },

  // Ruta pública: login
  { path: 'Login-api', component: LoginComponent },

  // Ruta protegida: menú principal
  {
    path: 'menu-api',
    component: Menu,
    canActivate: [authGuard],   // Protegida por el guard, solo accesible si hay token
    children: [
      // Ruta hija: lista de sucursales
      { path: 'sucursales-api', component: SucursalesComponent },

      // Ruta hija: formulario para crear sucursal
      { path: 'sucursales-create', component: SucursalesCreate }
    ]
  }
];
