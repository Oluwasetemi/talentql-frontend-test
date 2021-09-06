// 1. When all the colors and shapes are selected: “All items:”

// 2. When all the colors and a multiple shapes or all the shapes and multiple colors are selected: “Multiple items:”

// 3. When all the shapes and a single color is selected: “All red items:”

// 4. When all the colors and single shape is selected: “All oval items:”

// 5. When multiple the shapes and a single color is selected: “Multiple red items:”

// 6. When multiple the colors and single shape is selected: “Multiple oval items:”

// 7: When a single color and single shape is selected: “Round oval items:”

import { colors, shapes } from '../../src/filter.json';

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
		user.findAllByTestId(/shape-checkbox/).each(($el, index) => {
			if (index !== 1 && index !== 2) {
				user.wrap($el.parent()).click();
			}
		});
		user.findByTestId('message').should('have.text', 'Multiple Items');
	});

	it('When all the colors and a multiple shapes are selected: “Multiple items:”', () => {
		user.findAllByTestId(/color-checkbox/).each(($el, index) => {
			if (index !== 1 && index !== 2) {
				user.wrap($el.parent()).click();
			}
		});
		user.findByTestId('message').should('have.text', 'Multiple Items');
	});

	it('When all the shapes and a single color is selected: “All red items:”', () => {
		let redIndex = colors.findIndex((c) => c.name === 'red');
		// remove red from colors using its index.
		let colorsClone = colors.slice();
		colorsClone.splice(redIndex, 1);

		let selectedColors = colorsClone.map((c) => c.color);
		selectedColors.forEach((color) => user.findByTestId(`${color}`).click());

		user.findByTestId('message').should('have.text', 'All red Items');
	});

	it('When all the colors and single shape is selected: “All oval items:”', () => {
		// single shape
		const withOutOval = shapes.filter((shape) => shape !== 'Oval');

		withOutOval.forEach((shape) => user.findByText(`${shape}`).click());

		user.findByTestId('message').should('have.text', 'All Oval Items');
	});

	it('When multiple shapes and a single color is selected: “Multiple red items:”', () => {
		// single shape
		// const withOutOval = shapes.filter((shape) => shape !== 'Oval');

		shapes.slice(2).forEach((shape) => user.findByText(`${shape}`).click());

		let redIndex = colors.findIndex((c) => c.name === 'red');
		// remove red from colors using its index.
		let colorsClone = colors.slice();
		colorsClone.splice(redIndex, 1);

		let selectedColors = colorsClone.map((c) => c.color);
		selectedColors.forEach((color) => user.findByTestId(`${color}`).click());

		user.findByTestId('message').should('have.text', 'Multiple red Items');
	});

	it('When multiple  colors and single shape is selected: “Multiple oval items:”', () => {
		// single shape
		const withOutOval = shapes.filter((shape) => shape !== 'Oval');

		withOutOval.forEach((shape) => user.findByText(`${shape}`).click());

		colors
			.slice(3)
			.forEach((color) => user.findByTestId(`${color.color}`).click());

		user.findByTestId('message').should('have.text', 'Multiple Oval Items');
	});

	it('When a single color and single shape is selected: “Round oval items:”', () => {
		// single shape
		const withOutOval = shapes.filter((shape) => shape !== 'Oval');

		withOutOval.forEach((shape) => user.findByText(`${shape}`).click());

		let redIndex = colors.findIndex((c) => c.name === 'red');
		// remove red from colors using its index.
		let colorsClone = colors.slice();

		colorsClone.splice(redIndex, 1);

		let selectedColors = colorsClone.map((c) => c.color);
		selectedColors.forEach((color) => user.findByTestId(`${color}`).click());

		user.findByTestId('message').should('have.text', 'Oval red items');
	});
});
