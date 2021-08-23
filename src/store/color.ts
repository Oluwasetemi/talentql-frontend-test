// create the color slice with it reducers
// checkColor
// unCheckColor
// restoreColors
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IColors } from '../App';
import { colors } from '../filter.json';

export type colorState = {
	colors: Array<IColors>;
	selectedColors: Array<string>;
};

const colorTypes = colors.map((color) => color.color);

export const initialState: colorState = {
	colors,
	selectedColors: [...colorTypes],
};

// function isChecked(selectedColors: string[], color: string) {
// 	return selectedColors.includes(color);
// }

export const colorSlice = createSlice({
	name: 'Colors',
	initialState,
	reducers: {
		isChecked(colors, action) {
			colors.selectedColors.includes(action.payload);
		},
		checkColor(colors, action: PayloadAction<string>) {
			colors.selectedColors.push(action.payload);
		},
		unCheckColor(colors, action) {
			// console.log(action);
			const index = colors.selectedColors.findIndex(
				(color) => color === action.payload,
			);
			colors.selectedColors.splice(index, 1);
			// console.log(a);
		},
		resetColors(colors) {
			colors.selectedColors = colorTypes;
		},
	},
});

export const { isChecked, checkColor, unCheckColor, resetColors } =
	colorSlice.actions;
export default colorSlice.reducer;
