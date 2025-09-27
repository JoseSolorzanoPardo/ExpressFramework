import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Crear formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    onSubmit() {
     if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Aquí normalmente llamarías al backend
      if (email === 'admin@test.com' && password === '123') {
        this.router.navigate(['/dashboard']); 
        
      }
      else {
      alert('Credenciales inválidas');
    }
    }
  }
}
