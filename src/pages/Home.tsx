import * as React from 'react';
import { AuthButton } from '../components/AuthButton';
import { ColorsFilter } from '../components/Colors';
import { Navigation } from '../components/Navigation';
import { RenderBox } from '../components/RenderBox';
import { ShapesFilter } from '../components/Shapes';

function Dashboard() {
	return (
		<Navigation>
			<AuthButton />
			<h3>Filters</h3>
			<h5 className="blue-text">Shapes</h5>
			<ShapesFilter />
			<h5 className="blue-text">Colors</h5>
			<ColorsFilter />
			<RenderBox />
		</Navigation>
	);
}

export default Dashboard;
