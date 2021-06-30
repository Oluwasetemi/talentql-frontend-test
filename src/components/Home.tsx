import * as React from 'react';
import { AppWrapper, IColors } from '../App';
import data from '../filter.json';
import { AuthButton } from './AuthButton';
import { Colors } from './Colors';
import { Nav } from './Nav';
import { RenderBox } from './RenderBox';
import { CircleShape, OvalShape, RectangleShape, Shapes, SquareShape, TriangleShape } from './Shapes';


function Home() {

  const [shapeClicked, setShape] = React.useState<string | null>(null);
  const [colors, setColors] = React.useState<Array<IColors>>(data.colors);
  const colorTypes = colors.map(color => color.color);

  const [shapes] = React.useState<Array<string>>(data.shapes);
  const [selectedColors, setSelectedColors] = React.useState<string[]>(colorTypes);
  // console.log(colors);
  // console.log(shapes);

  let shape: React.ElementType<string> = (color: string) => <OvalShape color={color} />;
  if (shapeClicked === 'Oval') shape = (color: string) => <OvalShape color={color} />;
  if (shapeClicked === 'Round') shape = (color: string) => <CircleShape color={color} />;
  if (shapeClicked === 'Triangle') shape = (color: string) => <TriangleShape color={color} />;
  if (shapeClicked === 'Square') shape = (color: string) => <SquareShape color={color} />;
  if (shapeClicked === 'Rectangle') shape = (color: string) => <RectangleShape color={color} />;

  return (
    <>
      <Nav />
      <div className="App-body">
        <AppWrapper>
          <AuthButton />
          <h3>Filters</h3>
          <h5>Shapes</h5>
          <Shapes shapes={shapes} setShape={setShape} />
          <h5>Colors</h5>
          <Colors selectedColors={selectedColors} setSelectedColors={setSelectedColors} colorTypes={colorTypes} />
          <RenderBox shape={shape} colors={selectedColors} shapeClicked={shapeClicked} setColor={setColors} />
        </AppWrapper>
      </div>

    </>
  );
}

export default Home;