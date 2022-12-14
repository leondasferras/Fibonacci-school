describe("App works correctly with routes", function () {


  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Homepage opened correctly", () => {
    cy.contains("МБОУ АЛГОСОШ");

  });

  

  it("String page opened correctly", () => {
    cy.get('a[href="/recursion"]').click()

  });


});


