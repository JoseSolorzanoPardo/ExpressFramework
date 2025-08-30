// Importamos inject para inyectar servicios en funciones
import { inject } from '@angular/core';

// CanActivateFn es el tipo de guard que se ejecuta antes de cargar una ruta
import { CanActivateFn, Router } from '@angular/router';

// Importamos nuestro servicio de autenticación
import { AuthService } from '../services/auth.service';

// Definición del guard como una función
export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos el AuthService para saber si el usuario está autenticado
  const authService = inject(AuthService);

  // Inyectamos el Router para poder redirigir al usuario
  const router = inject(Router);

  // Verificamos si el usuario está autenticado
  if (authService.isAuthenticated()) {
    //  Si tiene token, se permite el acceso a la ruta
    return true;
  } else {
    //  Si no tiene token, lo redirigimos a la página de login
    router.navigate(['/Login-api']);
    return false;
  }
};
