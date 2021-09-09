/* eslint-disable import/no-extraneous-dependencies */
// Import your own reducer
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { authContext } from '../src/context/authContext';
import { useProvideAuth } from '../src/hooks/useProviderAuth';
import { RootState } from '../src/store';
import colorReducer, {
	initialState as initialStateColor,
} from '../src/store/color';
import shapeReducer, {
	initialState as initialStateShape,
} from '../src/store/shape';

type RenderResultModified = ReturnType<typeof rtlRender> & { store: RootState };

function render(
	ui: JSX.Element,
	{
		initialState = { color: initialStateColor, shape: initialStateShape },
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
			<>
				<ToastContainer
					position="top-right"
					autoClose={500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<authContext.Provider value={auth}>
					<Provider store={store}>{children}</Provider>
				</authContext.Provider>
			</>
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
