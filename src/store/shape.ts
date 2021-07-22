// create the color slice with it reducers
// checkColor
// unCheckColor
// restoreColors
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shapes } from '../filter.json';

export type shapeState = {
	shapes: typeof shapes;
	selectedShapes: typeof shapes;
};

export const initialState: shapeState = {
	shapes,
	selectedShapes: shapes,
};

export const shapeSlice = createSlice({
	name: 'Shapes',
	initialState,
	reducers: {
		checkShape(shapes, action: PayloadAction<string>) {
			shapes.selectedShapes.push(action.payload);

			shapes.selectedShapes.push();
		},
		unCheckShape(shapes, action) {
			// console.log(action);
			const index = shapes.selectedShapes.findIndex(
				(color) => color === action.payload,
			);
			shapes.selectedShapes.splice(index, 1);
			// console.log(a);
		},
		resetShapes(shapes) {
			shapes.selectedShapes = initialState.shapes;
		},
	},
});

export const { checkShape, unCheckShape, resetShapes } = shapeSlice.actions;
export default shapeSlice.reducer;
