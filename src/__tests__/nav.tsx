/* eslint-disable jest/no-disabled-tests */
import { act, fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import { Provider } from 'react-redux';
import wait from 'waait';
import App from '../App';
import { authContext } from '../context/authContext';
import { useProvideAuth } from '../hooks/useProviderAuth';
import store from '../store';

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

function NavApp() {
	const auth = useProvideAuth();
	return (
		<authContext.Provider value={auth}>
			<Provider store={store}>
				<App />
			</Provider>
		</authContext.Provider>
	);
}

test('nav component has a button log in', () => {
	const { getByTestId } = render(<NavApp />);
	const input = getByTestId(/login/i);
	expect(input).toMatchSnapshot();
});

test('fire button login in the has a button', async () => {
	const { findByTestId, getByTestId } = render(<NavApp />);
	const input = getByTestId(/login/i);

	act(() => {
		fireEvent.click(input);
	});

	const signOut = await findByTestId(/signout/i);
	expect(signOut).toBeInTheDocument();
});

test.skip('click on the logout button should log the fake user out', async () => {
	const { findByTestId } = render(<NavApp />);

	// const input = getByTestId(/login/i);
	screen.getByTestId(/login/i).click();
	let signOut = await findByTestId(/signout/i);

	act(() => {
		fireEvent.click(signOut);
		wait(200);
	});
	signOut = await findByTestId(/signout/i);
	// debug(signOut);
	// debug(container);

	expect(signOut).not.toBeInTheDocument();
});

test.skip('click on the logout button on the nav should log the fake user out', async () => {
	let res = render(<NavApp />);
	const { getByTestId, findByTestId } = res;
	// const { getByTestId, debug, container } = render(<NavApp />);
	const input = getByTestId(/login/i);
	await act(async () => {
		fireEvent.click(input);
		// await wait(200);
	});
	const signOut = await findByTestId(/logout/i);
	await act(async () => {
		fireEvent.click(signOut);
		await wait(200);
	});

	expect(signOut).toHaveTextContent('login');
});

test('click on the login button on the nav should log the fake user out', async () => {
	let res = render(<NavApp />);
	const { getByTestId, findByTestId } = res;
	// const { getByTestId, debug, container } = render(<NavApp />);
	const input = getByTestId(/signin/i);
	await act(async () => {
		fireEvent.click(input);
		// await wait(200);
	});
	const signOut = await findByTestId(/logout/i);
	expect(signOut).toHaveTextContent('logout');
});
