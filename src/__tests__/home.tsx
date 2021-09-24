import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { authContext } from '../context/authContext';
import { useProvideAuth } from '../hooks/useProviderAuth';
import Home from '../pages/Home';
import store from '../store';

const mockUseLocationValue = {
	pathname: '/',
	search: '',
	hash: '',
	state: null,
};

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as {}),
	useLocation: jest.fn().mockImplementation(() => {
		return mockUseLocationValue;
	}),
}));

function HomeApp() {
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
				<Provider store={store}>
					<Home />
				</Provider>
			</authContext.Provider>
		</>
	);
}

describe('<Home />', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});
	test('home component should render a not logged in on render without auth', () => {
		const { getByText } = render(<HomeApp />);
		const input = getByText(/You are not logged in./i);
		expect(input).toMatchSnapshot();
	});
});
