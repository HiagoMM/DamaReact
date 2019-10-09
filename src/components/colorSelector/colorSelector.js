import React, { useState } from 'react';
import './colorSelector.css';
import { CirclePicker } from 'react-color';

export default props => {
  const [color, setColor] = useState('FFFF');
  function handleClick(color) {
    setColor(color);
    console.log(color.hex);
    props.handleClick(color.hex);
  }
  return (
    <div className="colorSelector">
      <h2>Escolha sua cor</h2>
      <div className="pieceContainer">
        <CirclePicker
          width="100%"
          color={color}
          onChangeComplete={color => handleClick(color)}
        />
      </div>
    </div>
  );
};
