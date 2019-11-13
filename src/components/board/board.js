import "./board.css";
import React from "react";
import Piece from "../piece/piece";
import { insertColor } from "./boardUtil";
import Api from "../../services/ApiRequest";

export default props => {
  const { size, matriz } = props;
  const predictions = props.predictions;
  const tableSize = {
    gridTemplateColumns: `repeat(${size},1fr)`,
    gridTemplateRows: `repeat(${size},1fr)`
  };

  const handleDrop = (event, column, row) => {
    let oldIndexRow = event.dataTransfer.getData("rIndex");
    let oldIndexColumn = event.dataTransfer.getData("cIndex");

    props.movPiece(oldIndexColumn, oldIndexRow, column, row);
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
  return (
    <div className="board">
      <div className="table" style={tableSize}>
        {matriz &&
          matriz.map((list, rowIndex) => {
            return list.map((piece, columnIndex) => {
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
                  onDrop={event => handleDrop(event, columnIndex, rowIndex)}
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
