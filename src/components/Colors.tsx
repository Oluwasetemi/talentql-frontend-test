import React from 'react';
import styled from 'styled-components';


export const ColorContainer = styled.div`
  height: 50px;
  display: flex;
  gap: 10px;
`;
export const ColorItem = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${prop => prop.color};
  input[type="checkbox"] {
    width: 100%;
    /* height: 100%; */
    margin: 0 auto;
    /* display: none */
  }
`;

export function Colors({ selectedColors, setSelectedColors, colorTypes }: { selectedColors: Array<string>, colorTypes: Array<string>, setSelectedColors: (s: string[]) => void }) {


  function isChecked(color: string) {
    return selectedColors.includes(color);
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    // eslint-disable-next-line no-unused-expressions
    isChecked(name) ? setSelectedColors(selectedColors.filter(color => color !== name)) : setSelectedColors([...selectedColors, name]);
    // console.log(colorTypeState);

  };

  return (
    <ColorContainer>
      {
        colorTypes.map((color, index) => (
          <ColorItem key={index} color={color}>
            <input type="checkbox" name={color} id={color} checked={isChecked(color)} onChange={handleOnChange} />
          </ColorItem>))
      }
    </ColorContainer>
  );
}