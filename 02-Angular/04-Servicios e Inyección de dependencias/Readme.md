# ¿Qué es un Servicio?

Un servicio es una clase reutilizable que encapsula lógica o funcionalidades específicas que se desea compartir entre diferentes partes de una aplicación (como componentes, directivas, pipes, etc.).

## ¿Para qué se usa un servicio?

Los servicios son útiles para:

- 💬 Compartir datos entre componentes.
- 🌐 Hacer llamadas HTTP a APIs.
- 🧠 Almacenar lógica de negocio que no pertenece directamente al componente.
- 🛠️ Encapsular utilidades o funciones comunes.

## ¿Qué es un patrón de diseño?

Un patrón de diseño es una solución general y reutilizable a un problema común que ocurre frecuentemente en el desarrollo de software. A continuación, veamos por qué usarlos:

- 👨‍🔧 Porque resuelven problemas ya conocidos de forma eficiente.
- 🧼 Mejoran la organización y claridad del código.
- 🔄 Favorecen la reutilización y extensión del sistema.
- 🤝 Facilitan la comunicación entre desarrolladores ("esto es un Singleton", "esto es un Observer").

| **Nombre del patrón** | **Qué resuelve** | **Ejemplo en Angular** |
| --- | --- | --- |
| **Singleton** | Garantiza una sola instancia | Servicios con providedIn: 'root' |
| **Observer** | Notifica cambios a varios objetos | Observable y Subject con RxJS |
| **Factory** | Crea objetos sin exponer lógica de creación | Servicios que retornan instancias dinámicas |
| **Strategy** | Permite intercambiar algoritmos fácilmente | Pipes personalizados, políticas de login |
| **Dependency Injection** | Provee objetos desde afuera en lugar de crearlos | Sistema DI de Angular |

## La inyección de dependencias

Es un patrón de diseño que permite a una clase recibir (inyectar) las instancias de otras clases que necesita, en lugar de crearlas directamente.

## ¿Qué problema resuelve la inyección de dependencias?

Sin inyección de dependencias, las clases estarían acopladas (dependientes) a otras clases específicas. Eso dificulta:

- Reutilización
- Pruebas (testing)
- Mantenimiento del código

Fuerte Acomplamiento
```
export class MiComponente {

private logger = new LoggerService(); // Mal: dependencia directa

}
```
Bajo Acoplamiento
```
export class MiComponente {

constructor(private logger: LoggerService) {} // Angular lo inyecta

}
```
## ¿Qué hace @Injectable({ providedIn: 'root' })?

Le dice a Angular que este servicio estará disponible en toda la aplicación como un singleton (una única instancia).

## Un momento, pero ¿Qué es singleton?

Es un patrón de diseño que garantiza que solo exista una única instancia de una clase durante todo el ciclo de vida de una aplicación, y que esa instancia sea accesible globalmente.

Características del patrón Singleton

- 🔁 **Instancia única**: solo se crea una vez.
- 🧩 **Acceso global**: todos los que la necesitan acceden a la misma instancia.
- 🔒 **Control centralizado**: útil cuando quieres mantener un estado compartido (como configuración, logs, autenticación, datos temporales, etc.).

## Ahora regresemos a Angular ¿Qué es @Injectable()?

Es un decorador que marca una clase como elegible para la inyección de dependencias de Angular. Es decir, Angular podrá crear e inyectar instancias automáticamente de esa clase cuando otro componente, servicio, o directiva la necesite.

## ¿Qué hace providedIn: 'root'?

La opción providedIn: 'root' dentro del decorador:
```
@Injectable({

providedIn: 'root'

})
```
significa que Angular:

1. Crea una única instancia del servicio (singleton).
2. La registra en el inyector raíz (el contenedor global de dependencias).
3. Está disponible en toda la aplicación, sin necesidad de declararlo manualmente en los módulos (providers).

## Pero entonces ¿Qué es el "inyector raíz"?

Es como un contenedor global que Angular crea al iniciar la aplicación. Cualquier servicio registrado con providedIn: 'root' se almacena aquí.

Así, cualquier componente, servicio u otro objeto que necesite una instancia de ese servicio la obtiene desde el mismo lugar, lo que garantiza que es una sola instancia compartida.

## Relación con Principios SOLID

- Los servicios ayudan a separar responsabilidades (principio de responsabilidad única – SOLID).
- Promueven el uso de inyección de dependencias, un pilar en Angular.
- Son fundamentales para construir aplicaciones modulares, limpias y mantenibles.

Comando para crear un servicio:
```
ng generate service nombre-del-servicio
```
