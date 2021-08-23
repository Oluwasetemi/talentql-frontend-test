import configureStore from '../index';
import { checkShape, resetShapes, unCheckShape } from '../shape';

describe('shapeSlice', () => {
	let store: typeof configureStore;
	beforeEach(() => {
		// fakeAxios = new MockAdapter(axios);
		store = configureStore;
	});

	afterEach(() => {
		// reset the store
	});

	// projectsSlice([]);
	const shapesState = () => store.getState().shape.selectedShapes;

	describe('action creators', () => {
		it('should check and unCheck color', async () => {
			store.dispatch(unCheckShape('Oval'));

			store.dispatch(checkShape('Oval'));

			expect(shapesState()).toHaveLength(5);
		});

		it('should restore the state of the selectedColor when the last item of selectedColor is unChecked', async () => {
			// copy the first 5 item
			let dColor = shapesState();

			let firstFiveColors = dColor.slice(1);
			let lastColor = dColor.slice(0, 1);
			// console.log(lastColor);
			// console.log(firstFiveColors);

			firstFiveColors.forEach((color) => store.dispatch(unCheckShape(color)));

			// console.log(shapesState());

			store.dispatch(unCheckShape(lastColor[0]));

			store.dispatch(resetShapes());

			expect(shapesState()).toHaveLength(5);
		});
	});
});
