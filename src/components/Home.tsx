import * as React from 'react';
import { AppWrapper } from '../App';
import { AuthButton } from './AuthButton';
import { ColorsFilter } from './Colors';
import { Nav } from './Nav';
import { RenderBox } from './RenderBox';
import { ShapesFilter } from './Shapes';

function Dashboard() {
	return (
		<>
			<Nav />
			<div className="App-body">
				<AppWrapper>
					<AuthButton />
					<h3>Filters</h3>
					<h5 className="blue-text">Shapes</h5>
					<ShapesFilter />
					<h5 className="blue-text">Colors</h5>
					<ColorsFilter />
					<RenderBox />
				</AppWrapper>
			</div>
		</>
	);
}

export default Dashboard;
