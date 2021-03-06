// - All should be selected initially

// - Multiple filters can be selected (differentiate the states)

// - Deselecting the last filter should select all filters
// export {};

describe('functionality of the shape filter', () => {
	const user = cy;
	beforeEach(() => {
		user.visit('/').contains(/login/).click().wait(10);
	});
	it('Deselecting the last filter should select all filters', () => {
		user.findAllByTestId(/color-checkbox/).each(($el, index, $list) => {
			if (index != 5) {
				user.wrap($el.parent()).click();
				user.wrap($el).should('not.be.checked');
			} else {
				user.wrap($el).click({ force: true });
				user.wait(200);
				user.wrap($list).each(($el) => {
					user.wrap($el).should('be.checked');
				});
			}
		});
	});

	it('Multiple filters can be selected (differentiate the states)', () => {
		user.findAllByTestId(/color-checkbox/).each(($el, index) => {
			if (index != 3 && index !== 4) {
				user.wrap($el.parent()).click();
				user.wrap($el).should('not.be.checked');
			}
		});
	});

	it('All should be selected initially', () => {
		user.findAllByTestId(/color-checkbox/).each(($el) => {
			user.wrap($el).should('be.checked');
		});
	});
});
