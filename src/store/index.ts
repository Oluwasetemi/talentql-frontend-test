import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import colorReducer, { colorState } from './color';
import shapeReducer, { shapeState } from './shape';

const store = configureStore({
	reducer: {
		color: colorReducer,
		shape: shapeReducer,
	},
});
export default store;

export type StoreType = EnhancedStore<
	{ color: colorState; shape: shapeState },
	AnyAction
>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
