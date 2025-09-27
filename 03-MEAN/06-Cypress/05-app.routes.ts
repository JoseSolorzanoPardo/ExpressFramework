import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Registro as RegistroComponent } from './components/registro/registro';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirige al login por defecto
  { path: '**', redirectTo: 'login' }, // cualquier ruta no encontrada redirige al login
];
