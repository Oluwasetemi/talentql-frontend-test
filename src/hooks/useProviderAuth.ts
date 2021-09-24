import React from 'react';

export const fakeAuth = {
	username: 'admin',
	password: 'password',
	isAuthenticated: false,

	signin(cb: () => void) {
		if (fakeAuth.username == 'admin' && fakeAuth.password == 'password') {
			fakeAuth.isAuthenticated = true;
			setTimeout(cb, 100); // fake async
		}
	},
	signout(cb: () => void) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

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
		setUser,
		signin,
		signout,
	};
}
