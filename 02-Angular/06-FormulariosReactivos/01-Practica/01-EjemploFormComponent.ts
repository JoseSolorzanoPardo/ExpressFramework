// Importa el decorador Component de Angular para definir un componente.
import { Component } from '@angular/core';

// Importa herramientas del módulo de formularios reactivos:
// FormBuilder: para construir formularios fácilmente.
// FormGroup: representa un formulario completo.
// Validators: proporciona validaciones predefinidas como required o min.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importa CommonModule para poder usar directivas comunes como *ngIf, *ngFor.
import { CommonModule } from '@angular/common';

// Importa ReactiveFormsModule para habilitar el uso de formularios reactivos.
import { ReactiveFormsModule } from '@angular/forms';


// Define un componente de Angular
@Component({
  // Selector para usar el componente en HTML (<app-ejemplo-form-component>)
  selector: 'app-ejemplo-form-component',

  // Importación de módulos necesarios para que el componente funcione con formularios y directivas comunes
  imports: [CommonModule, ReactiveFormsModule],

  // Ruta al archivo HTML que contiene la vista (plantilla) del componente
  templateUrl: './ejemplo-form-component.html',

  // Ruta al archivo CSS para los estilos del componente
  styleUrl: './ejemplo-form-component.css'
})
export class EjemploFormComponent {
  // Declaración de la variable del formulario. Será del tipo FormGroup.
  miFormulario: FormGroup;

  // Constructor del componente, inyecta FormBuilder (servicio para crear formularios)
  constructor(private fb: FormBuilder) {
    // Inicialización del formulario con 3 controles: nombre, correo y edad.
    // Cada control recibe un valor inicial ('') y un arreglo de validaciones.
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required]],             // Campo obligatorio
      correo: ['', [Validators.required, Validators.email]], // Obligatorio y debe tener formato de email
      edad: ['', [Validators.required, Validators.min(18)]]  // Obligatorio y mínimo 18 años
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.miFormulario.valid) {
      // Muestra en consola los datos ingresados en el formulario
      console.log(this.miFormulario.value);
    }
  }
}
