import './board.css';
import React, { useState } from 'react';
import Piece from '../piece/piece';
import { blue } from 'ansi-colors';

export default props => {
  const [matriz, setMatriz] = useState([
    ['red', '', 'red', '', 'red', '', 'red', ''],
    ['', 'red', '', 'red', '', 'red', '', 'red'],
    ['red', '', 'red', '', 'red', '', 'red', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', props.color, '', props.color, '', props.color, '', props.color],
    [props.color, '', props.color, '', props.color, '', props.color, ''],
    ['', props.color, '', props.color, '', props.color, '', props.color]
  ]);
  function insertColor(rIndex, cIndex) {
    if (rIndex % 2 === 0) {
      if (cIndex % 2 === 1) {
        return 'rgb(238, 238, 238)';
      } else {
        return 'rgb(193, 193, 193)';
      }
    } else {
      if (cIndex % 2 === 0) {
        return 'rgb(238, 238, 238)';
      } else {
        return 'rgb(193, 193, 193)';
      }
    }
  }
  const handleDrop = (event, row, column) => {
    let oldIndexRow = event.dataTransfer.getData('rIndex');
    let oldIndexColumn = event.dataTransfer.getData('cIndex');

    const element = matriz[oldIndexRow][oldIndexColumn];
    matriz[oldIndexRow][oldIndexColumn] = '';
    matriz[row][column] = element;
    setMatriz([...matriz]);
  };

  const handleDrag = (event, row, column) => {
    console.log(event);
    event.dataTransfer.setData('rIndex', row);
    event.dataTransfer.setData('cIndex', column);
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  return (
    <div className="board">
      <div className="table">
        {matriz.map((list, rowIndex) => {
          return list.map((piece, columnIndex) => {
            return (
              <div
                key={rowIndex.toString() + columnIndex.toString()}
                style={{
                  backgroundColor: insertColor(rowIndex, columnIndex)
                }}
                className="pieceContainer"
                onDragOver={handleDragOver}
                onDrop={event => handleDrop(event, rowIndex, columnIndex)}
                onDragStart={event => handleDrag(event, rowIndex, columnIndex)}
              >
                <Piece piece={piece} />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
