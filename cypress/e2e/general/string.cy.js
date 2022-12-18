import { DELAY_IN_MS } from "../../../src/constants/delays";
import { borderColorStyles, circleId } from "../../constansts";

const testCirclesStyle = (index1, index2, borderColorStyles) => {
  cy.get("@circles")
    .eq(index1)
    .should("have.css", "border-color", borderColorStyles);
  cy.get("@circles")
    .eq(index2)
    .should("have.css", "border-color", borderColorStyles);
};

describe("String component works correct", function () {
  beforeEach(() => {
    cy.visit("recursion");
    cy.get("input").as("input");
    cy.contains("button", "Развернуть").as("button");
  });

  it("Button disabled when it needed", () => {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("12345");
    cy.get("@button").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("Animation works perfect", () => {
    cy.get("@input").type("12345");
    cy.get("@button").click();

    cy.wait(DELAY_IN_MS);

    cy.get(circleId).as("circles");

    testCirclesStyle(0, -1, borderColorStyles.default);
    cy.wait(DELAY_IN_MS);
    testCirclesStyle(0, -1, borderColorStyles.changing);
    cy.wait(DELAY_IN_MS);
    testCirclesStyle(0, -1, borderColorStyles.modified);
    cy.get("@circles").eq(0).should("have.text", "5");
    cy.get("@circles").eq(-1).should("have.text", "1");

    testCirclesStyle(1, -2, borderColorStyles.default);
    cy.wait(DELAY_IN_MS);
    testCirclesStyle(1, -2, borderColorStyles.changing);
    cy.wait(DELAY_IN_MS);
    testCirclesStyle(1, -2, borderColorStyles.modified);
    cy.get("@circles").eq(1).should("have.text", "4");
    cy.get("@circles").eq(-2).should("have.text", "2");

    testCirclesStyle(2, -3, borderColorStyles.default);
    cy.wait(DELAY_IN_MS);
    testCirclesStyle(2, -3, borderColorStyles.changing);
    cy.wait(DELAY_IN_MS);
    testCirclesStyle(2, -3, borderColorStyles.modified);
    cy.get("@circles").eq(2).should("have.text", "3");
    cy.get("@circles").eq(-3).should("have.text", "3");
  });
});
