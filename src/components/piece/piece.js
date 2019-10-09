import React from 'react';
import './piece.css';

export default props => {
  const { piece, style, onClick } = props;

  const handleDrag = event => {
    event.preventDefault();
  };

  return (
    <div
      draggable={piece !== ''}
      onDrag={handleDrag}
      onClick={onClick}
      style={
        piece
          ? {
              ...style,
              backgroundColor: piece,
              border: '7px double white'
            }
          : null
      }
      className="piece"
    ></div>
  );
};
