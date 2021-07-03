import { render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import Home from '../components/Home';
import { authContext } from '../context/authContext';
import { useProvideAuth } from '../hooks/useProviderAuth';

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
			<Home />
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
