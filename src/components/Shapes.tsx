import * as React from 'react';
import { Circle, Ellipse, Rectangle, Triangle } from 'react-shapes';
import styled from 'styled-components';

export const ShapesContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SingleShapeButton = styled.button`
  /* width: 80px; */
  /* height: 30px; */
  padding:5px 10px;
  border-radius: 15px;
  border: 1px solid grey;
  flex-direction: column;
  justify-items: center;

  :hover {
    box-shadow: 0 0 6px rgba(81, 203, 238, 1);
    background-color: #81a8f9
  }




`;

export function SquareShape({ color }: { color: string, }) {
  return (
    <Rectangle width={100} height={100} fill={{ color: color }} />
  );
}

export function RectangleShape({ color }: { color: string, }) {
  return (
    <Rectangle width={100} height={70} fill={{ color: color }} />
  );
}

export function CircleShape({ color }: { color: string, }) {
  return (
    <Circle r={50} fill={{ color: color }} />
  );
}

export function TriangleShape({ color }: { color: string, }) {
  return (
    <Triangle width={80} height={100} fill={{ color: color }} />
  );
}

export function OvalShape({ color }: { color: string, }) {
  return (
    <Ellipse rx={50} ry={70} fill={{ color: color }} />
  );
}

export function ShapesFilter({ shapes, setShape, selectedShapes, setSelectedShapes }: { shapes: Array<string>, setShape: (s: string) => void, selectedShapes: string[], setSelectedShapes: React.Dispatch<React.SetStateAction<string[]>> }) {
  // const [isActive, setActive] = React.useState(false);

  function isChecked(shape: string) {
    return selectedShapes.includes(shape);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // console.log('shaped clicked', event.currentTarget.innerText);
    const shapedClicked = event.currentTarget.innerText;
    // loop thru all the parent and remove current
    /* tslint:disable */
    const allButtons: Element[] = [...event.currentTarget.parentElement!.children];
    // console.log(allButtons);
    // allButtons.forEach(button => button?.classList.remove('current'));
    // event.currentTarget.classList.toggle('current');
    setShape(shapedClicked);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    // console.log(name);
    // const checked = isChecked(name);
    // console.log(checked);

    isChecked(name)
      ? setSelectedShapes(
        selectedShapes.filter((shape) => shape !== name),
      )
      : setSelectedShapes([...selectedShapes, name]);
    // console.log(selectedShapes);
  };



  return (
    <ShapesContainer className="shapes">
      {shapes.map((shape, index) => (<SingleShapeButton className={isChecked(shape) ? 'current' : ''} onClick={handleOnClick} key={index}>
        <input
          type="checkbox"
          name={shape}
          id={shape}
          checked={isChecked(shape)}
          onChange={handleOnChange}
        />
        <label htmlFor={shape}>
          {shape}
        </label>
      </SingleShapeButton>))}
    </ShapesContainer>
  );
}