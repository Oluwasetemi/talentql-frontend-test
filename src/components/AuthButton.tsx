import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AuthButton() {
	let history = useHistory();
	let auth = useAuth();

	return auth!.user ? (
		<p>
			Welcome!{' '}
			<button
				data-testid="signout"
				onClick={() => {
					auth!.signout(() => history.push('/'));
				}}
			>
				Sign out
			</button>
		</p>
	) : (
		<p>You are not logged in.</p>
	);
}
