describe('Сервис доступен', function() {
  it('Сервис доступен по адресу localhost:3000', function() {
    cy.visit('http://localhost:3000/');
  });
}); 
