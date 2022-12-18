import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { circleId } from "../../constansts";

describe("Fibonacci component works correct", function () {
  beforeEach(() => {
    cy.visit("fibonacci");
    cy.get("input").as("input");
    cy.contains("button", "Развернуть").as("button");
  });

  it("Button disabled when it needed", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("5");
    cy.get("@button").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("Numbers generated correctly", () => {
    cy.get("@input").type("5");
    cy.get("@button").click();

    cy.wait(SHORT_DELAY_IN_MS * 5);

    const result = [0, 1, 1, 2, 3, 5];

    cy.get(circleId).each(($circle, index) => {
      cy.wrap($circle).find("p").should("have.text", result[index]);
    });
  });
});
