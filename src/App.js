import React, { useState, useEffect } from "react";
import Board from "./components/board/board";
import Title from "./components/Title/Title";
import api from "./services/ApiRequest";
import "./App.css";

function App() {
  const [predictions, setPredictions] = useState([]);
  const [board, setBoard] = useState();
  useEffect(() => {
    api
      .post("/board", {
        player1: {
          name: "Hiago"
        },
        player2: {
          name: "Pedro"
        }
      })
      .then(res => {
        setBoard(res.data);
        console.log(res.data.table);
      });
  }, []);

  const makePredictions = (x, y) => {
    api
      .post("position/check", {
        board,
        position: {
          positionX: x,
          positionY: y
        }
      })
      .then(value => {
        setPredictions(value.data.position);
      });
  };
  const movPiece = (ox, oy, positionX, positionY) => {
    api
      .post("position/mov", {
        positionAndBoardDTO: {
          board,
          position: {
            positionX: ox,
            positionY: oy
          },
          typePlayer: board.currentPlayer
        },
        end: {
          positionX,
          positionY
        }
      })
      .then(value => {
        //setBoard(value.data);
      });
  };

  return (
    <div className="container">
      <Title />
      <Board
        movPiece={(ox, oy, x, y) => movPiece(ox, oy, x, y)}
        makePredictions={(x, y) => makePredictions(x, y)}
        predictions={predictions}
        matriz={board && board.table}
        size={8}
      />
      {/* <Players /> */}
    </div>
  );
}

export default App;
