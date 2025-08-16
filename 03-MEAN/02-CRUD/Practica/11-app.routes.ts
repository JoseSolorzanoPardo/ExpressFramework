import { Routes } from '@angular/router';

import { SucursalesComponent } from './components/sucursales-component/sucursales-component';
import { SucursalesCreate } from './components/sucursales-create/sucursales-create';


export const routes: Routes = [
    {path: '', redirectTo:'/sucursales-api', pathMatch : 'full'},
    {path: 'sucursales-api', component : SucursalesComponent},
    {path: 'sucursales-create', component : SucursalesCreate }

];
