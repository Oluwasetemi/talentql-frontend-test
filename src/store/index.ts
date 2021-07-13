import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './color';
import shapeReducer from './shape';

export const store = configureStore({
	reducer: {
		color: colorReducer,
		shape: shapeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
