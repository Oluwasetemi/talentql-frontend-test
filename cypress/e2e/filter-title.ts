// 1. When all the colors and shapes are selected: “All items:”

// 2. When all the colors and a multiple shapes or all the shapes and multiple colors are selected: “Multiple items:”

// 3. When all the shapes and a single color is selected: “All red items:”

// 4. When all the colors and single shape is selected: “All oval items:”

// 5. When multiple the shapes and a single color is selected: “Multiple red items:”

// 6. When multiple the colors and single shape is selected: “Multiple oval items:”

// 7: When a single color and single shape is selected: “Round oval items:”
describe('functionality of the shape filter', () => {
	const user = cy;
	beforeEach(() => {
		user.visit('/').contains(/login/).click().wait(10);
	});
	it('When all the colors and shapes are selected: “All items:”', () => {
		user.findAllByTestId(/shape-checkbox/).each(($el) => {
			user.wrap($el).should('be.checked');
		});
		user.findAllByTestId(/color-checkbox/).each(($el) => {
			user.wrap($el).should('be.checked');
		});
		user.wait(200);
		user.findByTestId('message').should('have.text', 'All Items');
	});

	it('When all the colors and a multiple shapes or all the shapes and multiple colors are selected: “Multiple items:”', () => {
		user.findByTestId('message').should('have.text', 'Multiple Items');
	});

	it('When all the shapes and a single color is selected: “All red items:”', () => {
		user.findByTestId('message').should('have.text', 'All red items');
	});

	it('When all the colors and single shape is selected: “All oval items:”', () => {
		user.findByTestId('message').should('have.text', 'All oval Items');
	});

	it('When multiple the shapes and a single color is selected: “Multiple red items:”', () => {
		user.findByTestId('message').should('have.text', 'Multiple Red Items');
	});

	it('When multiple the colors and single shape is selected: “Multiple oval items:”', () => {
		user.findByTestId('message').should('have.text', 'Multiple Oval Items');
	});

	it('When a single color and single shape is selected: “Round oval items:”', () => {
		user.findByTestId('message').should('have.text', 'Round Oval Items');
	});
});
