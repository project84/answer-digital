// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitPage', (url, pageTitle) => {

	cy.visit(url);
	cy.get('.main-header')
		.should('contain', pageTitle);

});

Cypress.Commands.add('moveElement', (elementToMove, targetElement) => {

	// Click and hold element
	cy.get(elementToMove)
		.trigger('mousedown', { which: 1 });

	// Move mouse to target and release mouse click
	cy.get(targetElement)
		.trigger('mousemove')
		.trigger('mouseup', { force: true });

});