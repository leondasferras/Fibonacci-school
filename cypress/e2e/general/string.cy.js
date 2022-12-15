import {DELAY_IN_MS} from '../../../src/constants/delays'

describe("String component works correct", function () {

  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
    cy.get("input").as("input");
    cy.contains("button", "Развернуть").as("button");
  });

  it("Button disabled when it needed", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type('12345');
    cy.get("@button").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("Button disabled when it needed", () => {
    cy.get("@input").type("123456");
    cy.get("@button").click();
    cy.wait(DELAY_IN_MS);
    cy.get("@input").type("not.be.empty");
  });












});