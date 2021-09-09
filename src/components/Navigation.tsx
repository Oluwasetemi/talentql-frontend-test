import React from 'react';
import { AppWrapper } from '../App';
import { Nav } from './Nav';

function Navigation({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav />
			<div className="App-body">
				<AppWrapper>{children}</AppWrapper>
			</div>
		</>
	);
}

export { Navigation };
