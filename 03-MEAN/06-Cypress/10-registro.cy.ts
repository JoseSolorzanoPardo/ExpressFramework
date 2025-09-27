/*
 * Flujo E2E completo:
 * Login ... Dashboard ... Registro de un usuario
 * 
 * Se prueba el camino típico de un usuario:
 * 1. Inicia sesión.
 * 2. Accede al dashboard y valida su contenido.
 * 3. Navega al formulario de registro.
 * 4. Completa y envía el formulario de registro.
 * 5. Valida la confirmación de éxito.
 */
describe('Flujo: Login → Dashboard → Registro', () => {
  it('Debe loguear, ir al dashboard, navegar a registro y registrar usuario', () => {
    
    // --- LOGIN ---
    cy.visit('http://localhost:4200/login'); // Abre la app en la página de login
    cy.contains('h2', 'Iniciar Sesión').should('be.visible'); // Verifica el título

    // Renderizado inicial del formulario
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled'); // Botón bloqueado si form inválido

    // Credenciales de ejemplo (ajusta a tu backend o mock)
    cy.get('#email').type('admin@test.com');
    cy.get('#password').type('123');
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // --- DASHBOARD ---
    cy.location('pathname').should('eq', '/dashboard'); // Verifica redirección
    cy.contains('h2', 'Bienvenido al Dashboard').should('be.visible'); // Confirma dashboard

    // Validación de tabla con encabezados correctos
    cy.get('table').should('exist');
    cy.get('table thead th').eq(0).should('contain', '#');
    cy.get('table thead th').eq(1).should('contain', 'Nombre');
    cy.get('table thead th').eq(2).should('contain', 'Correo');
    cy.get('table thead th').eq(3).should('contain', 'Rol');

    // Botón para crear usuario (routerLink="/registro")
    cy.contains('button', 'Crear usuario').should('be.visible').click();

    // --- REGISTRO ---
    cy.location('pathname').should('eq', '/registro'); // Validar redirección
    cy.contains('h2', 'Registro de Usuario').should('be.visible'); // Confirmar título

    // (Opcional) Stub de window.alert para validar mensaje de éxito
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alerta');
    });

    // Completar formulario de registro
    cy.get('input[formcontrolname="nombre"]').type('Jose Hember');
    cy.get('input[formcontrolname="email"]').type('jose.hember@example.com');
    cy.get('input[formcontrolname="telefono"]').type('3001234567');
    cy.get('input[formcontrolname="fechaNacimiento"]').type('1995-05-10');
    cy.get('input[formcontrolname="direccion"]').type('Calle 123 #45-67');
    cy.get('select[formcontrolname="pais"]').select('colombia'); // selecciona por value
    cy.get('input[formcontrolname="password"]').type('secreto123');
    cy.get('input[formcontrolname="confirmarPassword"]').type('secreto123');
    cy.get('input[formcontrolname="terminos"]').check(); // acepta términos

    // Enviar formulario
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // Verificar alert de éxito
    cy.get('@alerta').should('have.been.calledWith', 'Usuario registrado con éxito');

    // Verificar reseteo del formulario (opcional)
    cy.get('input[formcontrolname="nombre"]').should('have.value', '');
  });
});
