import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import { Login } from '../components/Login';
import { authContext } from '../context/authContext';
import { useProvideAuth } from '../hooks/useProviderAuth';

const mockUseLocationValue = {
	pathname: '/login',
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

function LoginApp() {
	const auth = useProvideAuth();
	return (
		<authContext.Provider value={auth}>
			<Login />
		</authContext.Provider>
	);
}

test('login component has a button log in', () => {
	const { getAllByText } = render(<LoginApp />);
	const input = getAllByText(/log in/i);
	expect(input[1]).toMatchSnapshot();
});

test('fire button login in the has a button', () => {
	const { getAllByText } = render(<LoginApp />);
	const input = getAllByText(/log in/i);
	fireEvent.click(input[1]);
});
