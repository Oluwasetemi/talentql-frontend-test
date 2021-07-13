// create the color slice with it reducers
// checkColor
// unCheckColor
// restoreColors
import { createSlice } from '@reduxjs/toolkit';
import type { IColors } from '../App';
import { colors } from '../filter.json';

export type colorState = {
	colors: Array<IColors>;
	selectedColors: Array<string>;
};

const colorTypes = colors.map((color) => color.color);

const initialState: colorState = {
	colors,
	selectedColors: [...colorTypes],
};

export const colorSlice = createSlice({
	name: 'Colors',
	initialState,
	reducers: {
		checkColor: (colors, action) => {},
		unCheckColor: (colors, action) => {},
		restoreColors: (colors, action) => {},
	},
});

export const { checkColor, unCheckColor, restoreColors } = colorSlice.actions;
export default colorSlice.reducer;
