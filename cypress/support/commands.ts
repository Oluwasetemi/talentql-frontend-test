declare namespace Cypress {
	interface Chainable<Subject> {
		assertHome(): Chainable<Subject>;
		loggedIn(): Chainable<Subject>;
	}
}

Cypress.Commands.add('assertHome', () => {
	cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
});

Cypress.Commands.add('loggedIn', () => {
	cy.visit(`${Cypress.config().baseUrl}`);
	// cy.findByTestId(/login/i).click();
});
