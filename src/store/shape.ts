// create the color slice with it reducers
// checkColor
// unCheckColor
// restoreColors
import { createSlice } from '@reduxjs/toolkit';
import { shapes } from '../filter.json';

export type shapeState = {
	shapes: typeof shapes;
	selectedShapes: typeof shapes;
};
const initialState: shapeState = {
	shapes,
	selectedShapes: shapes,
};

export const shapeSlice = createSlice({
	name: 'Shapes',
	initialState,
	reducers: {
		checkShape: (shapes, action) => {},
		unCheckShape: (shapes, action) => {},
		restoreShapes: (shapes, action) => {},
	},
});

export const { checkShape, unCheckShape, restoreShapes } = shapeSlice.actions;
export default shapeSlice.reducer;
