import * as React from 'react';
import { Circle, Ellipse, Rectangle, Triangle } from 'react-shapes';
import styled from 'styled-components';

export const ShapesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const SingleShapeButton = styled.button`
  /* width: 80px; */
  /* height: 30px; */
  padding:5px 10px;
  border-radius: 15px;
  border: 1px solid black;
  flex-direction: column;
  justify-items: center;
  :hover {
    border: 1px solid #b3cbfb;
    background-color: #ffffff;
  }
  &.current {
    border: 1px solid #b3cbfb;
    background-color: #ffffff;

  }
`;

export function SquareShape({ color }: { color: string }) {
  return (
    <Rectangle width={100} height={100} fill={{ color: color }} />
  );
}

export function RectangleShape({ color }: { color: string }) {
  return (
    <Rectangle width={100} height={70} fill={{ color: color }} />
  );
}

export function CircleShape({ color }: { color: string }) {
  return (
    <Circle r={50} fill={{ color: color }} />
  );
}

export function TriangleShape({ color }: { color: string }) {
  return (
    <Triangle width={80} height={100} fill={{ color: color }} />
  );
}

export function OvalShape({ color }: { color: string }) {
  return (
    <Ellipse rx={50} ry={70} fill={{ color: color }} />
  );
}

export function Shapes({ shapes, setShape }: { shapes: Array<string>, setShape: (s: string) => void }) {
  // const [isActive, setActive] = React.useState(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // console.log('shaped clicked', event.currentTarget.innerText);
    const shapedClicked = event.currentTarget.innerText;
    // loop thru all the parent and remove current
    /* tslint:disable */
    const allButtons: Element[] = [...event.currentTarget.parentElement!.children];
    // console.log(allButtons);
    allButtons.forEach(button => button?.classList.remove('current'));
    event.currentTarget.classList.toggle('current');
    setShape(shapedClicked);
  };

  return (
    <ShapesContainer className="shapes">
      {shapes.map((shape, index) => (<SingleShapeButton onClick={handleOnClick} key={index}>{shape}</SingleShapeButton>))}
    </ShapesContainer>
  );
}