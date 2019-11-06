import React, { useState } from 'react';
import './colorSelector.css';
import { CompactPicker } from 'react-color';

export default props => {
  const [color, setColor] = useState('FFFF');
  function handleClick(color) {
    setColor(color);
    props.handleClick(color.hex);
  }
  return (
    <div className="colorSelector">
      <h2>Escolha sua cor</h2>
      <div className="colorContainer">
        <CompactPicker
          color={color}
          onChangeComplete={color => handleClick(color)}
        />
      </div>
    </div>
  );
};
