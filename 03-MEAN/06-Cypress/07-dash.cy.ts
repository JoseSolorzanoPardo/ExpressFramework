/*
 * Bloque de pruebas E2E (end-to-end) para el módulo de Dashboard en Angular.
 * Se valida que el dashboard muestre correctamente su contenido:
 * - El título principal y el texto introductorio.
 * - La tabla de usuarios (encabezados y filas).
 * - La presencia de datos específicos de usuarios.
 */
describe('Dashboard Angular', () => {
  
  /*
   * beforeEach:
   * Este hook se ejecuta antes de cada prueba.
   * Aquí navegamos siempre a la ruta /dashboard para partir desde allí.
   */
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard'); 
  });

  /*
   * Caso de prueba 1:
   * Verifica que se muestre el título principal del dashboard
   * y el párrafo introductorio debajo de él.
   */
  it('Debe mostrar el título principal del dashboard', () => {
    cy.get('h2').first().should('contain', 'Bienvenido al Dashboard ');
    cy.get('p').should('contain', 'Aquí podrías mostrar información del usuario');
  });

  /*
   * Caso de prueba 2:
   * Valida que la tabla de usuarios existe y que sus encabezados
   * corresponden a los campos esperados: #, Nombre, Correo, Rol.
   */
  it('Debe mostrar la tabla de usuarios con encabezados correctos', () => {
    cy.get('table thead tr th').eq(0).should('contain', '#');
    cy.get('table thead tr th').eq(1).should('contain', 'Nombre');
    cy.get('table thead tr th').eq(2).should('contain', 'Correo');
    cy.get('table thead tr th').eq(3).should('contain', 'Rol');
  });

  /*
   * Caso de prueba 3:
   * Revisa que haya al menos un usuario cargado en la tabla,
   * validando que el cuerpo de la tabla tenga más de 0 filas.
   */
  it('Debe mostrar al menos un usuario en la tabla', () => {
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  /*
   * Caso de prueba 4:
   * Busca datos específicos de un usuario en particular
   * (ejemplo: Ana Torres con su correo) para confirmar que
   * la información renderizada es correcta.
   */
  it('Debe verificar datos de un usuario específico', () => {
    cy.contains('td', 'Ana Torres').should('exist'); // Valida que aparece la usuaria
    cy.contains('td', 'ana.torres@test.com').should('exist'); // Valida su correo
  });

});
