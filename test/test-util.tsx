/* eslint-disable import/no-extraneous-dependencies */
// Import your own reducer
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { authContext } from '../src/context/authContext';
import { useProvideAuth } from '../src/hooks/useProviderAuth';
import { RootState } from '../src/store';
import colorReducer from '../src/store/color';
import shapeReducer from '../src/store/shape';

type RenderResultModified = ReturnType<typeof rtlRender> & { store: RootState };

function render(
	ui: JSX.Element,
	{
		initialState,
		store = configureStore({
			reducer: { color: colorReducer, shape: shapeReducer },
			preloadedState: initialState,
		}),
		...options
	}: any = {},
): RenderResultModified {
	// configure the store
	function Wrapper({ children }: PropsWithChildren<unknown>) {
		const auth = useProvideAuth();

		return (
			<authContext.Provider value={auth}>
				<Provider store={store}>{children}</Provider>
			</authContext.Provider>
		);
	}

	const renderA = {
		...rtlRender(ui, {
			wrapper: Wrapper,
			...options,
		}),
		store,
	};

	return renderA;
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
