import React from 'react';
import { authContext } from '../context/authContext';

export function useAuth() {
	return React.useContext(authContext);
}
