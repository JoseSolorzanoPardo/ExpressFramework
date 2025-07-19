// Importa el decorador @Component para definir un componente en Angular.
import { Component } from '@angular/core';

// Importa clases necesarias para construir formularios reactivos:
// FormBuilder para facilitar la creación de formularios,
// FormGroup para agrupar controles,
// Validators para aplicar validaciones.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importa módulos necesarios para usar directivas comunes (*ngIf, *ngFor, etc.).
import { CommonModule } from '@angular/common';

// Importa el módulo que habilita los formularios reactivos en Angular.
import { ReactiveFormsModule } from '@angular/forms';


// Define el componente con sus metadatos.
@Component({
  // Nombre del selector que se usará en la plantilla HTML para renderizar el componente.
  selector: 'app-formulario-avanzado-component',

  // Importación de módulos necesarios para este componente.
  imports: [CommonModule, ReactiveFormsModule],

  // Ruta al archivo de la plantilla HTML del componente.
  templateUrl: './formulario-avanzado-component.html',

  // Ruta al archivo de estilos CSS del componente.
  styleUrl: './formulario-avanzado-component.css'
})
export class FormularioAvanzadoComponent {
  
  // Declaración del objeto 'formulario' de tipo FormGroup.
  formulario: FormGroup;

  // Constructor del componente: se inyecta FormBuilder para crear el formulario más fácilmente.
  constructor(private fb: FormBuilder) {

    // Se construye el formulario principal con dos subgrupos: 'datosPersonales' y 'direccion'.
    this.formulario = this.fb.group({
      
      // Subgrupo: datos personales
      datosPersonales: this.fb.group({
        // Campo 'nombre': requerido
        nombre: ['', Validators.required],

        // Campo 'telefono': requerido y debe ser un número de 10 dígitos (validación con expresión regular)
        telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      }),

      // Subgrupo: dirección
      direccion: this.fb.group({
        // Campo 'ciudad': requerido
        ciudad: ['', Validators.required],

        // Campo 'tipoResidencia': por defecto se selecciona 'casa', validación requerida
        tipoResidencia: ['casa', Validators.required]
      })
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    // Verifica que todo el formulario sea válido antes de procesar
    if (this.formulario.valid) {
      // Muestra en consola los datos del formulario
      console.log('Formulario enviado:', this.formulario.value);
    }
  }
}
