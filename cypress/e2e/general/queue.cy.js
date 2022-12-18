import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { borderColorStyles, circleId } from "../../constansts";

const testArr = [1, 2, 3, 4, 5, 6, 7];

describe("Queue component works correct", () => {
  beforeEach(() => {
    cy.visit("queue");
    cy.get("input").as("input");
    cy.contains("button", "Добавить").as("addButton");
    cy.contains("button", "Удалить").as("delButton");
    cy.contains("button", "Очистить").as("clrButton");
  });

  it("Add button disabled when it needed", () => {
    cy.get("@addButton").should("be.disabled");
    cy.get("@input").type("123");
    cy.get("@addButton").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@addButton").should("be.disabled");
  });

  it("Add animation works correct", () => {
    testArr.forEach((el, i) => {
      cy.get("@input").type(el);
      cy.get("@addButton").click();
      cy.get(circleId).as("circles");
      cy.get("@circles").eq(i).as("addedCircle");
      cy.get("@addedCircle").should(
        "have.css",
        "border-color",
        borderColorStyles.changing
      );
      cy.get("@addedCircle").should("have.text", el);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("@addedCircle").should(
        "have.css",
        "border-color",
        borderColorStyles.default
      );
      if (i === 0) {
        cy.get("@addedCircle").prev().should("have.text", "head");
      }
      cy.get("@addedCircle").next().next().should("have.text", "tail");
    });
    cy.get("@addButton").should("be.disabled");
  });

  it("Delete animation works correct", () => {
    testArr.forEach((el) => {
      cy.get("@input").type(el);
      cy.get("@addButton").click();
    });

    for (let index = 0; index < testArr.length; index++) {
      cy.get("@delButton").click();
      cy.get(circleId).as("circles");
      cy.get("@circles").eq(index).as("circleToDelete");

      cy.get("@circleToDelete").should(
        "have.css",
        "border-color",
        borderColorStyles.changing
      );

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("@circleToDelete").should(
        "have.css",
        "border-color",
        borderColorStyles.default
      );
      cy.get("@circleToDelete").find("p").should("be.empty");
      cy.get("@circleToDelete").prev().should("be.empty");

      if (index < testArr.length - 1) {
        cy.get("@circles")
          .eq(index + 1)
          .prev()
          .should("have.text", "head");
      }
    }
  });

  it("Clear animation works correct", () => {
    testArr.forEach((el) => {
      cy.get("@input").type(el);
      cy.get("@addButton").click();
    });
    cy.get("@clrButton").click();
    cy.get(circleId).invoke("text").should("be.empty");
  });
});
