// Importa el decorador @Component para definir un componente en Angular.
import { Component } from '@angular/core';

// Importa clases necesarias para construir formularios reactivos:
// FormBuilder para facilitar la creación de formularios,
// FormGroup para agrupar controles,
// Validators para aplicar validaciones.
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';

// Importa módulos necesarios para usar directivas comunes (*ngIf, *ngFor, etc.).
import { CommonModule } from '@angular/common';

// Importa el módulo que habilita los formularios reactivos en Angular.
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-simple-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-simple-component.html',
  styleUrl: './formulario-simple-component.css'
})
export class FormularioSimpleComponent {

   formulario: FormGroup;  // Formulario principal

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con un producto y al menos un precio
    this.formulario = this.fb.group({
      producto: ['', Validators.required],
      precios: this.fb.array([this.crearPrecio()])
    });
    
  }
    
 
  
  // Getter para acceder a los precios
  get precios(): FormArray {
    return this.formulario.get('precios') as FormArray;
  }

  // Crea un nuevo FormGroup con el campo 'monto'
  crearPrecio(): FormGroup {
    return this.fb.group({
      monto: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Agregar un precio
  agregarPrecio() {
    this.precios.push(this.crearPrecio());
  }

  // Eliminar un precio por índice
  eliminarPrecio(index: number) {
    if (this.precios.length > 1) {
      this.precios.removeAt(index);
    }
  }

  // Acción al enviar
  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }



}
