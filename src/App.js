import React, { useState, useEffect } from "react";
import Board from "./components/board/board";
import Title from "./components/Title/Title";
import api from "./services/ApiRequest";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [predictions, setPredictions] = useState([]);
  const [game, setGame] = useState();
  const [restart, setRestart] = useState();
  useEffect(() => {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      progressSteps: ["1", "2"]
    })
      .queue(["Player 1", "Player 2"])
      .then(result => {
        Swal.fire({
          title: "Tamanho do tabuleiro",
          input: "select",
          inputOptions: {
            8: 8,
            10: 10,
            12: 12
          },
          inputPlaceholder: "Escolha o tamanho do tabuleiro"
        }).then(({ value: size }) => {
          size = size || 8;
          api
            .post("/board", {
              size,
              player1: {
                name: (result.value && result.value[0]) || "Player 1"
              },
              player2: {
                name: (result.value && result.value[1]) || "Player 2"
              }
            })
            .then(res => {
              setGame(res.data);
            });
        });
      });
  }, [restart]);

  const makePredictions = (x, y) => {
    api
      .post("position/check", {
        game,
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
          game,
          position: {
            positionX: ox,
            positionY: oy
          },
          typePlayer: game.currentPlayer
        },
        end: {
          positionX,
          positionY
        }
      })
      .then(value => {
        setGame(value.data);
        if (value.data.winner) {
          Swal.fire(value.data.winner.name, "Vencedor !!", "success").then(
            setRestart
          );
        }
      });
  };

  return (
    <div className="container">
      {game && (
        <>
          <Title p1Counter={game.p1Counter} p2Counter={game.p2Counter} />
          <Board
            setPredictions={pre => setPredictions(pre)}
            movPiece={(ox, oy, x, y) => movPiece(ox, oy, x, y)}
            makePredictions={(x, y) => makePredictions(x, y)}
            predictions={predictions}
            game={game}
            size={game.size}
          />
        </>
      )}
    </div>
  );
}

export default App;
