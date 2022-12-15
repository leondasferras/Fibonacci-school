describe("App works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Homepage opened correctly", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("String page opened correctly", () => {
    cy.get('a[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("Fibonacci page opened correctly", () => {
    cy.get('a[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Fibonacci page opened correctly", () => {
    cy.get('a[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Sorting page opened correctly", () => {
    cy.get('a[href="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Stack page opened correctly", () => {
    cy.get('a[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("Queue page opened correctly", () => {
    cy.get('a[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("List page opened correctly", () => {
    cy.get('a[href="/list"]').click();
    cy.contains("Связный список");
  });
});
