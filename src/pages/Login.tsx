import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthButton } from '../components/AuthButton';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../hooks/useAuth';

export function Login(): JSX.Element {
	let history = useHistory();
	let location = useLocation();
	let auth = useAuth();

	let { from } = (location.state as any) || { from: { pathname: '/' } };

	let login = () => {
		auth!.signin(() => {
			history.replace(from);
		});
	};

	return (
		<Navigation>
			<AuthButton />
			<h3>Login</h3>
			<p>You must log in to view the Color and Shape filters</p>
			<button data-testid="login" onClick={login}>
				Log in
			</button>
		</Navigation>
	);
}
