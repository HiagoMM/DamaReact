import React, { useState, useEffect } from "react";
import Board from "./components/board/board";
import Title from "./components/Title/Title";
import api from "./services/ApiRequest";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [predictions, setPredictions] = useState([]);
  const [board, setBoard] = useState({});
  useEffect(() => {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      progressSteps: ["1", "2"]
    })
      .queue(["Player 1", "Player 2"])
      .then(result => {
        console.log(result);
        api
          .post("/board", {
            player1: {
              name: result.value[0]
            },
            player2: {
              name: result.value[1]
            }
          })
          .then(res => {
            setBoard(res.data);
          });
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
        setBoard(value.data);
      });
  };

  return (
    <div className="container">
      <Title p1Counter={board.p1Counter} p2Counter={board.p2Counter} />
      <Board
        setPredictions={pre => setPredictions(pre)}
        movPiece={(ox, oy, x, y) => movPiece(ox, oy, x, y)}
        makePredictions={(x, y) => makePredictions(x, y)}
        predictions={predictions}
        board={board}
        size={8}
      />
    </div>
  );
}

export default App;
