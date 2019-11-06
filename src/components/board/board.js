import './board.css';
import React from 'react';
import Piece from '../piece/piece';
import { insertColor } from './boardUtil';

export default props => {
  const { size, matriz, setMatriz } = props;
  const predictions = props.predictions;
  const tableSize = {
    gridTemplateColumns: `repeat(${size},1fr)`,
    gridTemplateRows: `repeat(${size},1fr)`
  };

  const handleDrop = (event, row, column) => {
    let oldIndexRow = event.dataTransfer.getData('rIndex');
    let oldIndexColumn = event.dataTransfer.getData('cIndex');

    const element = matriz[oldIndexRow][oldIndexColumn];
    matriz[oldIndexRow][oldIndexColumn] = '';
    matriz[row][column] = element;
    setMatriz([...matriz]);
  };

  const handleDrag = (event, row, column) => {
    event.dataTransfer.setData('rIndex', row);
    props.makePredictions(row, column);
    event.dataTransfer.setData('cIndex', column);
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  return (
    <div className="board">
      <div className="table" style={tableSize}>
        {matriz &&
          matriz.map((list, columnIndex) => {
            return list.map((piece, rowIndex) => {
              return (
                <div
                  key={rowIndex.toString() + columnIndex.toString()}
                  style={{
                    backgroundColor: insertColor(
                      piece,
                      rowIndex,
                      columnIndex,
                      predictions
                    )
                  }}
                  className="pieceContainer"
                  onDragOver={handleDragOver}
                  onDrop={event => handleDrop(event, rowIndex, columnIndex)}
                  onDragStart={event =>
                    handleDrag(event, rowIndex, columnIndex)
                  }
                >
                  {piece && piece.type ? <Piece piece={piece} /> : null}
                </div>
              );
            });
          })}
      </div>
    </div>
  );
};
