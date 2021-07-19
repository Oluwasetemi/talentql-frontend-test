import { checkColor, resetColors, unCheckColor } from '../color';
import configureStore from '../index';

describe('colorSlice', () => {
	let store: typeof configureStore;
	beforeEach(() => {
		// fakeAxios = new MockAdapter(axios);
		store = configureStore;
	});

	afterEach(() => {
		// reset the store
	});

	// projectsSlice([]);
	const colorsState = () => store.getState().color.selectedColors;

	describe('action creators', () => {
		it('should check and unCheck color', async () => {
			store.dispatch(unCheckColor('#008001'));

			store.dispatch(checkColor('#008001'));

			expect(colorsState()).toHaveLength(6);
		});

		it('should restore the state of the selectedColor when the last item of selectedColor is unChecked', async () => {
			// copy the first 5 item
			let dColor = colorsState();

			let firstFiveColors = dColor.slice(1);
			let lastColor = dColor.slice(0, 1);
			// console.log(lastColor);
			// console.log(firstFiveColors);

			firstFiveColors.forEach((color) => store.dispatch(unCheckColor(color)));

			// console.log(colorsState());

			store.dispatch(unCheckColor(lastColor[0]));

			store.dispatch(resetColors());

			expect(colorsState()).toHaveLength(6);
		});
	});
});
