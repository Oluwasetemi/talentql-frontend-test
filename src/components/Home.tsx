import * as React from 'react';
import { AppWrapper, IColors } from '../App';
import data from '../filter.json';
import { AuthButton } from './AuthButton';
import { ColorsFilter } from './Colors';
import { Nav } from './Nav';
import { RenderBox } from './RenderBox';
import { ShapesFilter } from './Shapes';


function ColorDashboard() {

  const [shapeClicked, setShapeClicked] = React.useState<string | null>(null);
  const [colors] = React.useState<Array<IColors>>(data.colors);
  const colorTypes = colors.map(color => color.color);

  const [multipleColors, setMultipleColors] = React.useState<boolean>(true);
  const [multipleShapes, setMultipleShapes] = React.useState<boolean>(true);


  const [shapes] = React.useState<Array<string>>(data.shapes);
  const [selectedColors, setSelectedColors] = React.useState<string[]>(colorTypes);
  const [selectedShapes, setSelectedShapes] = React.useState<string[]>(data.shapes);

  React.useEffect(() => {
    const multipleColors = selectedColors.length > 1;
    const multipleShapes = selectedShapes.length > 1;
    console.log(multipleColors, multipleShapes);

    setMultipleShapes(multipleShapes);
    setMultipleColors(multipleColors);
  }, []);

  return (
    <>
      <Nav />
      <div className="App-body">
        <AppWrapper>
          <AuthButton />
          <h3>Filters</h3>
          <h5 className="blue-text">Shapes</h5>
          <ShapesFilter shapes={shapes} setShape={setShapeClicked} selectedShapes={selectedShapes} setSelectedShapes={setSelectedShapes} />
          <h5 className="blue-text">Color.colors</h5>
          <ColorsFilter selectedColors={selectedColors} setSelectedColors={setSelectedColors} colorTypes={colorTypes} />
          <RenderBox colors={selectedColors} shapeClicked={shapeClicked} selectedShapes={selectedShapes} />
        </AppWrapper>
      </div>

    </>
  );
}

export default ColorDashboard;