import React from "react";
import "./piece.css";

export default props => {
  const { piece } = props;
  const p1Color = "rgba(255, 251, 235, 0.88)";
  const p2Color = "rgb(29, 35, 75)";

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
