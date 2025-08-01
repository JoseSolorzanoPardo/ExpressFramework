// ------------------------------------------------------------
// Importaciones desde Angular Core
// ------------------------------------------------------------

// ApplicationConfig → Permite definir la configuración global de la aplicación Angular
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

// provideRouter → Permite registrar las rutas de la aplicación
import { provideRouter } from '@angular/router';

// ------------------------------------------------------------
// Importación de rutas definidas en app.routes.ts
// ------------------------------------------------------------
import { routes } from './app.routes';

// ------------------------------------------------------------
// Importaciones para peticiones HTTP
// ------------------------------------------------------------
// provideHttpClient → Registra el cliente HTTP globalmente
// withFetch → Indica que Angular debe usar la API Fetch en lugar de XMLHttpRequest (XHR)
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';

// ------------------------------------------------------------
// Configuración global de la aplicación
// ------------------------------------------------------------
export const appConfig: ApplicationConfig = {
  providers: [

    // ------------------------------------------------------------
    // Manejo global de errores
    // ------------------------------------------------------------
    // Captura errores a nivel global en toda la aplicación.
    provideBrowserGlobalErrorListeners(),

    // ------------------------------------------------------------
    // Configuración de detección de cambios (Zone.js)
    // ------------------------------------------------------------
    // eventCoalescing: true → Agrupa eventos para optimizar la detección de cambios,
    // mejorando el rendimiento en aplicaciones grandes.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // ------------------------------------------------------------
    // Configuración de enrutamiento
    // ------------------------------------------------------------
    // Registra las rutas de la aplicación para que Angular Router las pueda usar.
    provideRouter(routes),

    // ------------------------------------------------------------
    // Configuración del cliente HTTP
    // ------------------------------------------------------------
    // Activa HttpClient globalmente y usa Fetch API para las solicitudes HTTP.
    provideHttpClient(withFetch())
  ]
};
