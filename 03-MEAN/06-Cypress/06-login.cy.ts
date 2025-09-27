/*
 * Bloque de pruebas E2E (end-to-end) para el módulo de Login en Angular.
 * Usamos Cypress para automatizar la interacción con el navegador,
 * simulando cómo un usuario real usaría la aplicación.
 */
describe('Login Angular', () => {

  /*
   * Caso de prueba 1:
   * Verifica que el formulario de login se muestre correctamente,
   * incluyendo título, campos de email y password, y que el botón de
   * enviar esté deshabilitado si el formulario es inválido.
   */
  it('Debe mostrar el formulario de login', () => {
    cy.visit('http://localhost:4200/login'); // Visita la ruta de login
    cy.get('h2').should('contain', 'Iniciar Sesión'); // Verifica que el título sea correcto
    cy.get('input[formControlName="email"]').should('be.visible'); // Verifica campo email
    cy.get('input[formControlName="password"]').should('be.visible'); // Verifica campo password
    cy.get('button[type="submit"]').should('be.disabled'); // El botón debe estar deshabilitado inicialmente
  });

  /*
   * Caso de prueba 2:
   * Simula un login exitoso con credenciales válidas.
   * - Completa los campos del formulario.
   * - Valida que el botón se habilite.
   * - Verifica que la app redirige al dashboard y muestra un mensaje de bienvenida.
   */
  it('Debe permitir iniciar sesión con credenciales válidas', () => {
    cy.visit('http://localhost:4200/login'); // Visita la ruta de login
    cy.wait(500); // Espera breve para carga del DOM (opcional)

    // Llenar los campos con credenciales válidas
    cy.get('input[formControlName="email"]').type('admin@test.com');
    cy.get('input[formControlName="password"]').type('hjkjsdfh564');
    cy.wait(500);

    // El botón de enviar debe habilitarse
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.wait(1000);

    // Validar que se redirige al dashboard
    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido al Dashboard').should('be.visible'); // Mensaje de confirmación
  });

  /*
   * Caso de prueba 3:
   * Intenta loguear con un correo con formato inválido.
   * - El botón debe permanecer deshabilitado.
   * - Debe mostrarse el mensaje de validación correspondiente.
   */
  it('No debe permitir iniciar sesión con un correo inválido', () => {
    cy.visit('http://localhost:4200/login');
    cy.wait(500);

    // Llenar campos con correo inválido y una contraseña cualquiera
    cy.get('input[formControlName="email"]').type('admin-test.com');
    cy.get('input[formControlName="password"]').type('hjkjsdfh564');
    cy.wait(500);

    // El botón debería permanecer deshabilitado (validaciones reactivas)
    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait(500);

    // Verificar mensaje de error mostrado por email inválido
    cy.contains('El correo es obligatorio y debe tener un formato válido.').should('be.visible');
  });

  /*
   * Caso de prueba 4:
   * Simula un login fallido con credenciales incorrectas.
   * - Se completa el formulario.
   * - Se hace submit.
   * - Se valida que se muestra un mensaje de error (en este caso, un alert).
   */
  it('Debe mostrar error con credenciales inválidas', () => {
    cy.visit('http://localhost:4200/login');
    cy.wait(500);

    // Llenar con credenciales incorrectas
    cy.get('input[formControlName="email"]').type('usuario@falso.com');
    cy.get('input[formControlName="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.wait(500);

    // Escuchar y validar el alert mostrado por la aplicación
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains('Credenciales inválidas');
    });
  });

});
