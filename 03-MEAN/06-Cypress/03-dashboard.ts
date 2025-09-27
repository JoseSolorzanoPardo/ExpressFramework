import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

   usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana Torres', email: 'ana.torres@test.com', rol: 'Admin' },
    { id: 2, nombre: 'Carlos López', email: 'carlos.lopez@test.com', rol: 'Usuario' },
    { id: 3, nombre: 'María Gómez', email: 'maria.gomez@test.com', rol: 'Editor' }
  ];

}
