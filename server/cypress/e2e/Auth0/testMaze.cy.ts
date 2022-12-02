/// <reference types="cypress" />

context('Maze Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
      cy.wait(500);
      cy.get('#play-button').click();
        cy.wait(4000);
    })
    it('Place a minion, order it to move', () => {
        

    });

});