// Importa el decorador Component para definir un componente en Angular
import { Component } from '@angular/core';
// Importa clases para manejar formularios reactivos: FormArray, FormBuilder, FormGroup y validadores
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importa CommonModule para usar directivas comunes como *ngIf, *ngFor
import { CommonModule } from '@angular/common';
// Importa ReactiveFormsModule para trabajar con formularios reactivos en Angular
import { ReactiveFormsModule } from '@angular/forms';

// Decorador que define el componente Angular
@Component({
  selector: 'app-form-array-component',            // Nombre del selector para usar el componente
  imports: [CommonModule, ReactiveFormsModule],    // Módulos necesarios para plantillas y formularios reactivos
  templateUrl: './form-array-component.html',      // Archivo HTML asociado al componente
  styleUrl: './form-array-component.css'           // Archivo CSS para los estilos del componente
})
export class FormArrayComponent {
  formulario: FormGroup;  // Variable que contendrá el formulario principal

  // Constructor: se inyecta FormBuilder para crear grupos y controles de formulario de forma más sencilla
  constructor(private fb: FormBuilder) {
    // Se inicializa el formulario con dos campos:
    // 1. nombre: un FormControl vacío con validación requerida
    // 2. correos: un FormArray que contiene inicialmente un FormGroup creado con crearCorreo()
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correos: this.fb.array([this.crearCorreo()])
    });
  }

  // Getter para obtener el FormArray 'correos' del formulario y convertirlo en tipo FormArray
  get correos(): FormArray {
    return this.formulario.get('correos') as FormArray;
  }

  // Método para crear un FormGroup que representa un correo
  // Contiene un FormControl llamado 'email' con validadores de requerido y formato de correo
  crearCorreo(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Agrega un nuevo FormGroup de correo al FormArray 'correos'
  agregarCorreo() {
    this.correos.push(this.crearCorreo());
  }

  // Elimina el FormGroup en el índice especificado del FormArray 'correos'
  // Solo se permite eliminar si hay más de un correo
  eliminarCorreo(index: number) {
    if (this.correos.length > 1) {
      this.correos.removeAt(index);
    }
  }

  // Método que se ejecuta al enviar el formulario
  // Si el formulario es válido, imprime los valores en la consola
  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }
}
