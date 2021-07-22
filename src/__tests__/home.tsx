import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import { authContext } from '../context/authContext';
import { useProvideAuth } from '../hooks/useProviderAuth';
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
	auth.signin(() => console.log('login'));
	return (
		<authContext.Provider value={auth}>
			<Provider store={store}>
				<Home />
			</Provider>
		</authContext.Provider>
	);
}

describe('<Home />', () => {
	test('home component should render a not logged in on render without auth', () => {
		const { getByText } = render(<HomeApp />);
		const input = getByText(/You are not logged in./i);
		expect(input).toMatchSnapshot();
	});
});
