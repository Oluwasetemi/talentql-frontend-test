import { act, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import * as React from 'react';
import wait from 'waait';
import App from '../App';

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
	useHistory: () => {
		return {
			replace: jest.fn,
			push: jest.fn,
		};
	},
}));

function NavApp() {
	return <App />;
}

test('nav component has a button log in', () => {
	const { getByTestId } = render(<NavApp />);
	const input = getByTestId(/login/i);
	expect(input).toMatchSnapshot();
});

test('fire button login in the has a button', async () => {
	let res = render(<NavApp />);
	const { getByTestId } = res;
	// const { getByTestId, debug, container } = render(<NavApp />);
	const input = getByTestId(/login/i);
	await act(async () => {
		fireEvent.click(input);
		await wait(200);
	});
	// debug(container);
	const signOut = getByTestId(/signout/i);
	expect(signOut).toBeInTheDocument();
});

test('click on the logout button should log the fake user out', async () => {
	let res = render(<NavApp />);
	const { getByTestId } = res;
	// const { getByTestId, debug, container } = render(<NavApp />);
	const input = getByTestId(/login/i);
	await act(async () => {
		fireEvent.click(input);
		await wait(200);
	});
	const signOut = getByTestId(/signout/i);
	await act(async () => {
		fireEvent.click(signOut);
		await wait(200);
	});
	expect(signOut).not.toBeInTheDocument();
});

test('click on the logout button on the nav should log the fake user out', async () => {
	let res = render(<NavApp />);
	const { getByTestId } = res;
	// const { getByTestId, debug, container } = render(<NavApp />);
	const input = getByTestId(/login/i);
	await act(async () => {
		fireEvent.click(input);
		await wait(200);
	});
	const signOut = getByTestId(/logout/i);
	await act(async () => {
		fireEvent.click(signOut);
		await wait(200);
	});
	expect(signOut).toHaveTextContent('login');
});

test('click on the login button on the nav should log the fake user out', async () => {
	let res = render(<NavApp />);
	const { getByTestId } = res;
	// const { getByTestId, debug, container } = render(<NavApp />);
	const input = getByTestId(/signin/i);
	await act(async () => {
		fireEvent.click(input);
		await wait(200);
	});
	const signOut = getByTestId(/logout/i);
	expect(signOut).toHaveTextContent('logout');
});
