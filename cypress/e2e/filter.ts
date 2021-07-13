/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('color and shape filter app', () => {
	const user = cy;
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		user.visit(`${Cypress.config().baseUrl}`);
	});
	it('our app load correctly', () => {
		user.findByTestId(/login/i).should('have.text', 'Log in');
	});

	it('should route to /login on load', () => {
		cy.assertHome();
	});

	it('should self authenticate', () => {
		user.findByTestId(/login/i).click();
		user.findByTestId(/signout/).should('have.text', 'Sign out');
	});

	it('should load the shape filter with all element', () => {
		user.findByTestId(/login/i).click();
		user
			.findAllByTestId(/shape-checkbox/)
			.its('length')
			.should('be.eq', 5);
	});

	it('should load the color filter with all element', () => {
		user.findByTestId(/login/i).click();
		user.findAllByTestId(/color-checkbox/).should('have.length', '6');
	});

	it('should load the shape filter with all element checked', () => {
		user.findByTestId(/login/i).click();
		user.findAllByTestId(/shape-checkbox/).each(($el) => {
			cy.wrap($el).should('be.checked');
		});
	});

	it('should load the color filter with all element checked', () => {
		user.findByTestId(/login/i).click();
		user.findAllByTestId(/color-checkbox/).each(($el) => {
			cy.wrap($el.parent().hasClass('current'));
		});
	});
});
