import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { borderColorStyles, circleId, smallCircleId } from "../../constansts";

const testArr = [1, 8, 34, 0];

const colorStyles = {
  changing: "#D252E1",
  default: "#0032FF",
};

const checkStyles = (index) => {
  cy.get("@circles").eq(index).as("circle");

  cy.get("@circle").should(
    "have.css",
    "border-color",
    borderColorStyles.changing
  );

  cy.get("@circle")
    .prev()
    .find(smallCircleId)
    .should("have.text", "123")
    .and("have.css", "border-color", borderColorStyles.changing);

  if (index == 3) {
    return;
  }

  cy.get("@circle")
    .parent()
    .next()
    .children()
    .invoke("attr", "fill")
    .should("eq", colorStyles.changing);
};

describe("List component works correct", () => {
  beforeEach(() => {
    cy.visit("list");
    cy.get("[data-testid=valueInput]").as("valueInput");
    cy.get("[data-testid=indexInput]").as("indexInput");
    cy.contains("button", "Добавить в head").as("addHeadBtn");
    cy.contains("button", "Добавить в tail").as("addTailBtn");
    cy.contains("button", "Добавить по индексу").as("addIndxBtn");
    cy.contains("button", "Удалить из head").as("delHeadBtn");
    cy.contains("button", "Удалить из tail").as("delTailBtn");
    cy.contains("button", "Удалить по индексу").as("delIndxBtn");
    cy.get(circleId).as("circles");
  });

  it("Buttons disabled when it needed", () => {
    cy.get("@addHeadBtn").should("be.disabled");
    cy.get("@addTailBtn").should("be.disabled");
    cy.get("@addIndxBtn").should("be.disabled");
    cy.get("@delIndxBtn").should("be.disabled");

    cy.get("@valueInput").type("123");
    cy.get("@addHeadBtn").should("not.be.disabled");
    cy.get("@addTailBtn").should("not.be.disabled");

    cy.get("@indexInput").type("2");
    cy.get("@addIndxBtn").should("not.be.disabled");
    cy.get("@delIndxBtn").should("not.be.disabled");

    cy.get("@indexInput").clear();
    cy.get("@addIndxBtn").should("be.disabled");
    cy.get("@delIndxBtn").should("be.disabled");

    cy.get("@valueInput").clear();
    cy.get("@addHeadBtn").should("be.disabled");
    cy.get("@addTailBtn").should("be.disabled");
  });

  it("Default list renders correct", () => {
    cy.get("@circles").first().prev().should("have.text", "head");
    cy.get("@circles").last().next().next().should("have.text", "tail");
    cy.get("@circles").each(($el, i) => {
      cy.wrap($el).should("have.text", testArr[i]);
    });
  });

  it("Adding to head works correct", () => {
    cy.get("@valueInput").type("123");
    cy.get("@addHeadBtn").click();
    cy.get("@circles")
      .first()
      .prev()
      .find(smallCircleId)
      .should("have.text", "123")
      .and("have.css", "border-color", borderColorStyles.changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").first().as("addedCircle");
    cy.get("@addedCircle")
      .should("have.text", "123")
      .and("have.css", "border-color", borderColorStyles.modified);
    cy.get("@addedCircle").prev().should("have.text", "head");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@addedCircle").should(
      "have.css",
      "border-color",
      borderColorStyles.default
    );
  });

  it("Adding to tail works correct", () => {
    cy.get("@valueInput").type("123");
    cy.get("@addTailBtn").click();

    checkStyles(0);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").first().prev().should("have.text", "head");

    checkStyles(1);
    cy.wait(SHORT_DELAY_IN_MS);

    checkStyles(2);
    cy.wait(SHORT_DELAY_IN_MS);

    checkStyles(3);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .last()
      .should("have.text", "123")
      .and("have.css", "border-color", borderColorStyles.modified);
    cy.get("@circles").last().next().next().should("have.text", "tail");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").each(($el, index, arr) => {
      cy.wrap($el).should(
        "have.css",
        "border-color",
        borderColorStyles.default
      );
      if (index < arr.length - 1) {
        cy.wrap($el)
          .parent()
          .next()
          .children()
          .invoke("attr", "fill")
          .should("eq", colorStyles.default);
      }
    });
  });

  it("Add element by index works correct", () => {
    cy.get("@valueInput").type("123");
    cy.get("@indexInput").type("3");
    cy.get("@addIndxBtn").click();

    checkStyles(0);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").first().prev().should("have.text", "head");

    checkStyles(1);
    cy.wait(SHORT_DELAY_IN_MS);

    checkStyles(2);
    cy.wait(SHORT_DELAY_IN_MS);

    checkStyles(3);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .eq(3)
      .should("have.text", "123")
      .and("have.css", "border-color", borderColorStyles.modified);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").each(($el, index, arr) => {
      cy.wrap($el).should(
        "have.css",
        "border-color",
        borderColorStyles.default
      );
      if (index < arr.length - 1) {
        cy.wrap($el)
          .parent()
          .next()
          .children()
          .invoke("attr", "fill")
          .should("eq", colorStyles.default);
      }
    });
  });

  it("Delete element from head works correct", () => {
    cy.get("@delHeadBtn").click();

    cy.get("@circles").first().should("have.text", "");
    cy.get("@circles")
      .first()
      .next()
      .next()
      .find(smallCircleId)
      .should("have.css", "border-color", borderColorStyles.changing)
      .and("have.text", "1");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .first()
      .should("have.css", "border-color", borderColorStyles.modified)
      .and("have.text", "8");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .first()
      .should("have.css", "border-color", borderColorStyles.default);

    cy.get("@circles").first().prev().should("have.text", "head");
    cy.get("@circles").should("have.length", 3);
  });

  it("Delete element from tail works correct", () => {
    cy.get("@delTailBtn").click();

    cy.get("@circles").last().should("have.text", "");
    cy.get("@circles")
      .last()
      .next()
      .next()
      .find(smallCircleId)
      .should("have.css", "border-color", borderColorStyles.changing)
      .and("have.text", "0");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .last()
      .should("have.css", "border-color", borderColorStyles.modified)
      .and("have.text", "34");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .last()
      .should("have.css", "border-color", borderColorStyles.default);

    cy.get("@circles").last().next().next().should("have.text", "tail");
    cy.get("@circles").should("have.length", 3);
  });

  it("Delete element by index works correct", () => {
    cy.get("@indexInput").type("2");
    cy.get("@delIndxBtn").click();

    cy.get("@circles")
      .eq(0)
      .should("have.css", "border-color", borderColorStyles.changing);
    cy.get("@circles")
      .eq(0)
      .parent()
      .next()
      .children()
      .invoke("attr", "fill")
      .should("eq", colorStyles.changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .eq(1)
      .should("have.css", "border-color", borderColorStyles.changing);
    cy.get("@circles")
      .eq(1)
      .parent()
      .next()
      .children()
      .invoke("attr", "fill")
      .should("eq", colorStyles.changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .eq(2)
      .should("have.css", "border-color", borderColorStyles.changing);
    cy.get("@circles")
      .eq(2)
      .parent()
      .next()
      .children()
      .invoke("attr", "fill")
      .should("eq", colorStyles.changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles").eq(2).should("have.text", "");
    cy.get("@circles")
      .eq(2)
      .next()
      .next()
      .find(smallCircleId)
      .should("have.css", "border-color", borderColorStyles.changing)
      .and("have.text", "34");

    cy.wait(SHORT_DELAY_IN_MS * 2);

    cy.get("@circles").should("have.length", 3);
  });
});
