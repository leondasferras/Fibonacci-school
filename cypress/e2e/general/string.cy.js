

describe("String component works correct", function () {

before(()=> {
  cy.visit('http://localhost:3000/recursion')
})

it('Button disabled when it needed', () => {
  cy.get('input').should('be.empty')
  // cy.get('button').contains('p', 'Развернуть').should('be.disabled')
  cy.contains('button', 'Развернуть').should('be.disabled')
  cy.get('input').type('12345')
  cy.contains('button', 'Развернуть').should('not.be.disabled')
  cy.get('input').clear()
  cy.contains('button', 'Развернуть').should('be.disabled')
})

})