// Importamos HttpInterceptorFn, que permite definir interceptores en Angular v15+
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

// Importamos nuestro servicio de autenticación para obtener el token
import { AuthService } from '../services/auth.service';

// Definición del interceptor (se ejecuta antes de cada petición HTTP)
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos AuthService para acceder al token almacenado
  const authService = inject(AuthService);

  // Obtenemos el token desde localStorage (a través del servicio)
  const token = authService.getToken();

  // Si existe token, clonamos la request y le agregamos el header Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` } // <-- aquí se añade el JWT
    });
    return next(cloned); // enviamos la petición modificada
  }

  // Si no hay token, dejamos pasar la request original sin modificar
  return next(req);
};
