import * as React from 'react';
import { AppWrapper, IColors } from '../App';
import data from '../filter.json';
import { AuthButton } from './AuthButton';
import { ColorsFilter } from './Colors';
import { Nav } from './Nav';
import { RenderBox } from './RenderBox';
import { ShapesFilter } from './Shapes';

function ColorDashboard() {
	const [colors] = React.useState<Array<IColors>>(data.colors);
	const colorTypes = colors.map((color) => color.color);

	const [shapes] = React.useState<Array<string>>(data.shapes);
	// prettier-ignore
	const [selectedColors, setSelectedColors] =
		React.useState<string[]>(colorTypes);
	const [selectedShapes, setSelectedShapes] = React.useState<string[]>(
		data.shapes,
	);

	return (
		<>
			<Nav />
			<div className="App-body">
				<AppWrapper>
					<AuthButton />
					<h3>Filters</h3>
					<h5 className="blue-text">Shapes</h5>
					<ShapesFilter
						shapes={shapes}
						selectedShapes={selectedShapes}
						setSelectedShapes={setSelectedShapes}
					/>
					<h5 className="blue-text">Color.colors</h5>
					<ColorsFilter
						selectedColors={selectedColors}
						setSelectedColors={setSelectedColors}
						colorTypes={colorTypes}
					/>
					<RenderBox colors={selectedColors} selectedShapes={selectedShapes} />
				</AppWrapper>
			</div>
		</>
	);
}

export default ColorDashboard;
