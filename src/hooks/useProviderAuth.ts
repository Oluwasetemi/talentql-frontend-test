import React from 'react';
import { fakeAuth } from '../App';

export function useProvideAuth() {
	const [user, setUser] = React.useState<string | null>(null);

	const signin = (cb: () => void) => {
		return fakeAuth.signin(() => {
			setUser('user');
			cb();
		});
	};

	const signout = (cb: () => void) => {
		return fakeAuth.signout(() => {
			setUser(null);
			cb();
		});
	};

	return {
		user,
		signin,
		signout,
	};
}
