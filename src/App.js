import React, { useState, useEffect } from 'react';
import Util from './utils/initializer';
import Board from './components/board/board';
import Chat from './components/chat/chat';
import Players from './components/players/players';
import ColorSelector from './components/colorSelector/colorSelector';
import './App.css';

function App() {
  //const [user, setUser] = useState({});
  const [color, setColor] = useState('blue');

  // useEffect(() => {
  //   Util.starter().then(result => {
  //     if (result.value) {
  //       setUser({
  //         name: result.value.name || result.value.login,
  //         imageUrl: result.value.avatar_url
  //       });
  //     }
  //   });
  // }, []);

  return (
    <div className="container">
      <Board color={color} />
      <ColorSelector handleClick={setColor} />
      <Players />
      <Chat />
    </div>
  );
}

export default App;
