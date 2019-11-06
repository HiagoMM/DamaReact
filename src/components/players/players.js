import React from 'react';
import './players.css';
import Avatar from 'react-avatar';

export default props => {
  const players = [
    {
      name: 'hiagomm'
    },
    {
      name: 'pedromrj'
    },
    {
      name: 'lti2team'
    },
    {
      name: 'joaobosconff'
    },
    {
      name: 'hiagomm'
    },
    {
      name: 'pedromrj'
    },
    {
      name: 'lti2team'
    },
    {
      name: 'matheusrsousa'
    }
  ];
  return (
    <div className="players">
      {players.map(player => {
        return (
          <div className="player">
            <Avatar
              githubHandle={player.name}
              name={player.name}
              size="4vw"
              round="20px"
            />
            <h4>{player.name.toUpperCase()}</h4>
          </div>
        );
      })}
    </div>
  );
};
