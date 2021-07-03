import React from 'react';
import { useProvideAuth } from '../hooks/useProviderAuth';

export interface AppContextInterface {
	user: string | null;
	signin: (cb: () => void) => void;
	signout: (cb: () => void) => void;
}

export const authContext = React.createContext<AppContextInterface | null>(
	null,
);

export function ProvideAuth({ children }: { children: React.ReactNode }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
