import * as React from 'react';
import styled from 'styled-components';
import { colors as rawColors, shapes as rawShapes } from '../filter.json';
import { CircleShape, OvalShape, RectangleShape, SquareShape, TriangleShape } from './Shapes';

export const BoxContainer = styled.div`
  width:200px;
  height: 200px;
  background-color: white;
  display: grid;
  place-content: center;
`;

export const BoxWrapper = styled.div`
  padding-left: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export function RenderBox({ colors, selectedShapes }: { colors: Array<string>, selectedShapes: string[] }) {

  let [message, setMessage] = React.useState<string>('All Items');

  let ovalShape = () => selectedShapes.includes('Oval') && colors.map(color => (<BoxContainer key={color}>
    <OvalShape color={color} />
  </BoxContainer>));
  let circleShape = () => selectedShapes.includes('Round') && colors.map(color => (<BoxContainer key={color}>
    <CircleShape color={color} />
  </BoxContainer>));
  let triangleShape = () => selectedShapes.includes('Triangle') && colors.map(color => (<BoxContainer key={color}>
    <TriangleShape color={color} />
  </BoxContainer>));
  let squareShape = () => selectedShapes.includes('Square') && colors.map(color => (<BoxContainer key={color}>
    <SquareShape color={color} />
  </BoxContainer>));
  let rectangleShape = () => selectedShapes.includes('Rectangle') && colors.map(color => (<BoxContainer key={color}>
    <RectangleShape color={color} />
  </BoxContainer>));

  React.useEffect(() => {
    const allColors = rawColors.length === colors.length;
    const allShapes = rawShapes.length === selectedShapes.length;

    if (allColors && allShapes) {
      setMessage('All Items');
    } else if (allShapes && colors.length === 1) {
      const foundColor = rawColors.find(color => color.color === colors[0]);
      setMessage(`All ${foundColor!.name} Items`);
    } else if (allColors && selectedShapes.length === 1) {
      setMessage(`All ${selectedShapes[0]} Items`);
    } else if (selectedShapes.length > 1 && colors.length === 1) {
      const foundColor = rawColors.find(color => color.color === colors[0]);
      setMessage(`Multiple ${foundColor!.name} Items`);
    } else if (colors.length > 1 && selectedShapes.length === 1) {
      setMessage(`Multiple ${selectedShapes} Items`);
    } else if (colors.length === 1 && selectedShapes.length === 1) {
      const foundColor = rawColors.find(color => color.color === colors[0]);
      setMessage(`${selectedShapes[0]} ${foundColor?.name} items`);
    } else if (allColors && selectedShapes.length < rawShapes.length || allShapes && colors.length < rawColors.length) {
      setMessage('Multiple Items');
    }
  }, [colors, selectedShapes, message]);

  return (
    <>
      <h2 data-testid="message">{message}</h2>
      <BoxWrapper>
        <>
          {ovalShape()}
          {circleShape()}
          {triangleShape()}
          {squareShape()}
          {rectangleShape()}
        </>
      </BoxWrapper>
    </>

  );
}