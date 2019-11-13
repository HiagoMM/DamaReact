import React from "react";
import "./piece.css";

export default props => {
  const { piece } = props;
  const p1Color = "#FFFF";
  const p2Color = "#000";

  return (
    <div
      draggable
      style={{
        backgroundColor: piece.type === "PLAYER1" ? p1Color : p2Color
      }}
      className="piece"
    ></div>
  );
};
