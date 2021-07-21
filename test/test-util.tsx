/* eslint-disable import/no-extraneous-dependencies */
// test-utils.jsx
/* eslint-ignore */
// Import your own reducer
import { configureStore } from '@reduxjs/toolkit';
import {
	Queries,
	render as rtlRender,
	RenderResult,
} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { authContext } from '../src/context/authContext';
import { useProvideAuth } from '../src/hooks/useProviderAuth';
import colorReducer from '../src/store/color';
import shapeReducer from '../src/store/shape';

type RenderResultModified = {
	[k in keyof RenderResult<Queries, HTMLElement>]: RenderResult[k];
};

function render(
	ui: JSX.Element,
	{
		initialState,
		s = configureStore({
			reducer: { color: colorReducer, shape: shapeReducer },
			preloadedState: initialState,
		}),
		...options
	}: any = {},
): RenderResultModified | { s: any } {
	// configure the store
	function Wrapper({ children }: { children: JSX.ElementChildrenAttribute }) {
		const auth = useProvideAuth();

		return (
			<authContext.Provider value={auth}>
				<Provider store={s}>{children}</Provider>
			</authContext.Provider>
		);
	}

	return {
		...rtlRender(ui, { wrapper: Wrapper, ...options }),
		s,
	};
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
