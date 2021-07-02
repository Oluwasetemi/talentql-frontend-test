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
  position: relative;
  width: calc(50px + 15Vmin);

  :hover {
    box-shadow: 0 0 6px rgba(81, 203, 238, 1);
    background-color: #81a8f9
  }

  input[type="checkbox"] {
    visibility: hidden;
    width:0;
    height:100%;
  }

  input[type="checkbox"]:checked + label {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
  }

  input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }

  label {
    background-color: transparent;
    border: 1px solid #ccc;
    cursor: pointer;
    padding:5px 10px;

    /* height: 50px; */
    left: 0;
    position: absolute;
    top: 0;
    width: calc(50px + 8Vmin);
    border-radius: 15px;
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

export function ShapesFilter({ shapes, selectedShapes, setSelectedShapes }: { shapes: Array<string>, selectedShapes: string[], setSelectedShapes: React.Dispatch<React.SetStateAction<string[]>> }) {
  // const [isActive, setActive] = React.useState(false);

  function isChecked(shape: string) {
    return selectedShapes.includes(shape);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    // console.log(name);
    // const checked = isChecked(name);
    // console.log(checked);

    // eslint-disable-next-line no-unused-expressions
    isChecked(name)
      ? setSelectedShapes(
        selectedShapes.filter((shape) => shape !== name),
      )
      : setSelectedShapes([...selectedShapes, name]);
    // console.log(selectedShapes);
  };



  return (
    <ShapesContainer className="shapes">
      {shapes.map((shape, index) => (<SingleShapeButton className={isChecked(shape) ? 'current' : ''} key={index}>
        <input
          data-testid="shape-checkbox"
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