import * as React from 'react';
import styled from 'styled-components';
import { IColors } from '../App';

export const BoxContainer = styled.div`
  width:200px;
  height: 200px;
  border: 1px solid black;
  display: grid;
  place-content: center
`;

export const BoxWrapper = styled.div`
  padding-left: 5px;
  display: flex;
  gap: 10px
`;

export function RenderBox({ shape, colors, shapeClicked }: { shape: (s: string) => React.ReactElement, colors: Array<string>, shapeClicked: string | null, id: number, setColor: (n: [IColors]) => void }) {

  return (
    <>
      <h2>All {shapeClicked?.toLowerCase()} items. {colors.length}</h2>
      <BoxWrapper>
        {colors.map(
          (color, index) => {
            return (
              <BoxContainer key={index}>
                {shape(color)}
              </BoxContainer>
            );
          }
        )}
      </BoxWrapper>
    </>

  );
}