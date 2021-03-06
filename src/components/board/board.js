import "./board.css";
import React, { useState } from "react";
import Piece from "../piece/piece";
import { insertColor } from "./boardUtil";
export default props => {
  const { size, predictions, setPredictions, game } = props;
  const matriz = game.board.table;
  const [clickPos, setClickPos] = useState({});
  const tableSize = {
    gridTemplateColumns: `repeat(${size},1fr)`,
    gridTemplateRows: `repeat(${size},1fr)`
  };

  const handleDrop = (event, column, row) => {
    let oldIndexRow = event.dataTransfer.getData("rIndex");
    let oldIndexColumn = event.dataTransfer.getData("cIndex");
    if (oldIndexColumn !== column && oldIndexRow !== row) {
      props.movPiece(oldIndexColumn, oldIndexRow, column, row);
    }
    setPredictions([]);
  };

  const handleDrag = (event, row, column) => {
    event.dataTransfer.setData("rIndex", row);
    event.dataTransfer.setData("cIndex", column);
    props.makePredictions(column, row);
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleClick = (event, columnIndex, rowIndex) => {
    if (predictions.length) {
      props.movPiece(
        clickPos.columnIndex,
        clickPos.rowIndex,
        columnIndex,
        rowIndex
      );

      setPredictions([]);
    } else {
      props.makePredictions(columnIndex, rowIndex);
      setClickPos({ columnIndex, rowIndex });
    }
  };
  return (
    <div className="board">
      <h2 className="pieceSide">
        {game.player1 && game.player1.name}
        <br />
        {game.p2Counter}
      </h2>
      <div className="table" style={tableSize}>
        {matriz &&
          matriz.map((list, rowIndex) => {
            return list.map((piece, columnIndex) => {
              return (
                <div
                  key={rowIndex.toString() + columnIndex.toString()}
                  style={{
                    backgroundColor: insertColor(
                      rowIndex,
                      columnIndex,
                      predictions
                    )
                  }}
                  className="pieceContainer"
                  onDragOver={handleDragOver}
                  onClick={event => handleClick(event, columnIndex, rowIndex)}
                  onDrop={event => handleDrop(event, columnIndex, rowIndex)}
                  onDragStart={event =>
                    handleDrag(event, rowIndex, columnIndex)
                  }
                >
                  {piece && piece.type ? (
                    <Piece size={game.size} piece={piece} />
                  ) : null}
                </div>
              );
            });
          })}
      </div>
      <div>
        <h2 className="pieceSide p2">
          {game.player2 && game.player2.name} <br />
          {game.p1Counter}
        </h2>
      </div>
    </div>
  );
};
