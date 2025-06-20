// Importación del decorador Component y del módulo CommonModule
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Decorador que define los metadatos del componente
@Component({
  selector: 'app-table-users',             // Nombre del componente usado en HTML
  imports: [CommonModule],                 // Importación necesaria para usar *ngIf, *ngFor, etc.
  templateUrl: './table-users.html',       // Ruta al archivo HTML que contiene la plantilla visual
  styleUrl: './table-users.css'            // Ruta al archivo de estilos CSS del componente
})
export class TableUsers {

  // Declaración inicial de la variable usuarios como un arreglo vacío (buena práctica para inicialización)
  // usuarios: any[] = [];

  // Posteriormente, se asigna una lista de usuarios simulados (mock data)
  usuarios = [
    {
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      fechaNacimiento: '1990-05-15',
      perfil: 'Administrador',
    },
    {
      nombre: 'María Gómez',
      correo: 'maria.gomez@example.com',
      fechaNacimiento: '1995-08-22',
      perfil: 'Usuario',
    },
    {
      nombre: 'Carlos Ruiz',
      correo: 'carlos.ruiz@example.com',
      fechaNacimiento: '1988-11-02',
      perfil: 'Soporte',
    },
    {
      nombre: 'Laura Ramírez',
      correo: 'laura.ramirez@example.com',
      fechaNacimiento: '1992-03-18',
      perfil: 'Desarrollador',
    },
    {
      nombre: 'Andrés Torres',
      correo: 'andres.torres@example.com',
      fechaNacimiento: '1991-07-09',
      perfil: 'Diseñador',
    },
    {
      nombre: 'Camila Herrera',
      correo: 'camila.herrera@example.com',
      fechaNacimiento: '1996-12-01',
      perfil: 'Analista',
    },
    {
      nombre: 'Felipe Mendoza',
      correo: 'felipe.mendoza@example.com',
      fechaNacimiento: '1985-10-26',
      perfil: 'Administrador',
    },
    {
      nombre: 'Natalia Rojas',
      correo: 'natalia.rojas@example.com',
      fechaNacimiento: '1993-04-13',
      perfil: 'QA Tester',
    },
    {
      nombre: 'Ricardo Salazar',
      correo: 'ricardo.salazar@example.com',
      fechaNacimiento: '1987-09-30',
      perfil: 'Usuario',
    },
    {
      nombre: 'Diana Castaño',
      correo: 'diana.castano@example.com',
      fechaNacimiento: '1994-11-17',
      perfil: 'Product Owner',
    }
  ];
}
