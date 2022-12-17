import { DELAY_IN_MS } from "../../../src/constants/delays";
import { borderColorStyles } from "../../constansts";

const testArr = [1, 2, 3, 4, 5];

describe("Stack component works correct", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
    cy.get("input").as("input");
    cy.contains("button", "Добавить").as("addButton");
    cy.contains("button", "Удалить").as("delButton");
    cy.contains("button", "Очистить").as("clrButton");
  });

  it("Button disabled when it needed", () => {
    cy.get("@input").should("be.empty");
    cy.get("@addButton").should("be.disabled");
    cy.get("@input").type("123");
    cy.get("@addButton").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@addButton").should("be.disabled");
  });

  it("Add animation works correct", () => {
    testArr.forEach((n, i) => {
      cy.get("@input").type(n);
      cy.get("@addButton").click();

      cy.get("[data-testid=circle]").as("circles");
      cy.get("@circles").last().as("lastCircle");
      cy.get("@lastCircle").should(
        "have.css",
        "border-color",
        borderColorStyles.default
      );
      cy.get("@lastCircle").should("have.text", n);
      cy.get("@lastCircle").next().should("have.text", i);
      cy.wait(DELAY_IN_MS);
      cy.get("@lastCircle").should(
        "have.css",
        "border-color",
        borderColorStyles.changing
      );
      cy.get("@lastCircle").prev().should("have.text", "top");

      if (i > 0) {
        cy.get("@circles")
          .eq(i - 1)
          .as("prevCircle");
        cy.get("@prevCircle").should(
          "have.css",
          "border-color",
          borderColorStyles.default
        );
        cy.get("@prevCircle").prev().should("be.empty");
      }
    });
  });

  it("Delete animation works correct", () => {
    testArr.forEach((n) => {
      cy.get("@input").type(n);
      cy.get("@addButton").click();
    });

    for (let index = 0; index < testArr.length; index++) {
      cy.get("@delButton").click();
      cy.wait(DELAY_IN_MS);
      if (index == testArr.length - 1) break;
      cy.get("[data-testid=circle]").last().as("lastCircle");
      cy.get("@lastCircle").should(
        "have.css",
        "border-color",
        borderColorStyles.changing
      );
      cy.get("@lastCircle").prev().should("have.text", "top");
    }
  });

  it("Clear works correct", () => {
    testArr.forEach((n) => {
      cy.get("@input").type(n);
      cy.get("@addButton").click();
    });

    cy.get("@clrButton").click();
    cy.get("[data-testid=circle]").should("not.exist");
  });
});
