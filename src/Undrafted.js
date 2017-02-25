import React from 'react';

import PlayerTable from './PlayerTable'

function Undrafted(props) {
  let players = props.players.slice().filter(p => !p.drafted);

  if (props.position) {
    players = players.filter(p => p.position.includes(props.position));
  }

  players = players.sort((a, b) => a.rank - b.rank);

  return (
    <PlayerTable
      size={props.size}
      fields={props.fields}
      players={players}
      onClick={(p) => props.draft(p)}
    />
  );
}


Undrafted.propTypes = {
  draft: React.PropTypes.func.isRequired,
  players: React.PropTypes.array.isRequired,
  fields: React.PropTypes.array.isRequired,

  size: React.PropTypes.number,
  position: React.PropTypes.string,
};

export default Undrafted
