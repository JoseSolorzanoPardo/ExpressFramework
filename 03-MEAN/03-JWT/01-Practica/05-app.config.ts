// Importamos ApplicationConfig para configurar la aplicación en modo standalone
// provideBrowserGlobalErrorListeners: captura errores globales del navegador
// provideZoneChangeDetection: optimiza el sistema de detección de cambios
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

// provideRouter: permite registrar las rutas definidas en app.routes.ts
import { provideRouter } from '@angular/router';

// provideHttpClient: habilita HttpClient en toda la app
// withFetch: usa la API Fetch del navegador en lugar de XMLHttpRequest
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';

// Importamos las rutas definidas en el proyecto
import { routes } from './app.routes';

// Importamos nuestro interceptor JWT
import { jwtInterceptor } from './auth/jwt-interceptor';

// withInterceptors: permite registrar interceptores HTTP
import { withInterceptors } from '@angular/common/http';

// Configuración principal de la aplicación Angular (standalone)
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Manejo global de errores
    provideZoneChangeDetection({ eventCoalescing: true }), // Mejora el rendimiento agrupando eventos
    provideRouter(routes), // Habilita el enrutamiento usando las rutas definidas
    provideHttpClient(
      withFetch(), // Usa fetch para peticiones HTTP
      withInterceptors([jwtInterceptor]) // Registra el interceptor JWT para añadir token en cada request
    )
  ]
};
