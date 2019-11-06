import React, { useState, useEffect } from 'react';
import Board from './components/board/board';
import Players from './components/players/players';
import Title from './components/Title/Title';
import api from './services/ApiRequest';
import './App.css';

// useEffect(() => {
//   Util.starter().then(result => {
//     if (result.value) {
//       setUser({
//         name: result.value.name || result.value.login,
//         imageUrl: result.value.avatar_url
//       });
//       console.log({
//         name: result.value.login,
//       });
//     }
//   });
// }, []);
function App() {
  const [matriz, setMatriz] = useState([[]]);
  const [predictions, setPredictions] = useState([]);
  const [board, setBoard] = useState();
  useEffect(() => {
    api
      .post('/board', {
        player1: {
          name: 'Hiago'
        },
        player2: {
          name: 'Pedro'
        }
      })
      .then(res => {
        setBoard(res.data);
        setMatriz(res.data.table);
      });
  }, []);

  const makePredictions = (x, y) => {
    api
      .post('position/check', {
        board,
        position: {
          positionX: x,
          positionY: y
        },
        typePlayer: board.currentPlayer
      })
      .then(value => {
        setPredictions(value.data.position);
      });
  };

  return (
    <div className="container">
      <Title />
      <Board
        makePredictions={(x, y) => makePredictions(x, y)}
        predictions={predictions}
        matriz={matriz}
        setMatriz={setMatriz}
        size={8}
      />
      <Players />
    </div>
  );
}

export default App;
