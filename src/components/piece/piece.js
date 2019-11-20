import React from "react";
import "./piece.css";
import Coroa from "../../assets/coroa.png";
export default props => {
  const { piece, size } = props;
  const p1Color = "rgba(255, 251, 235, 0.88)";
  const p2Color = "rgb(29, 35, 75)";

  let pieceSize = "";
  switch (size) {
    case 8:
      pieceSize = "4vw";
      break;
    case 10:
      pieceSize = "2.9vw";
      break;
    case 12:
      pieceSize = "2.2vw";
      break;
    default:
      pieceSize = "4vw";
  }
  return (
    <div
      draggable
      style={{
        backgroundImage: piece.dama ? "url(" + Coroa + ")" : "",
        backgroundColor: piece.type === "PLAYER1" ? p1Color : p2Color,
        width: pieceSize,
        height: pieceSize
      }}
      className="piece"
    ></div>
  );
};
