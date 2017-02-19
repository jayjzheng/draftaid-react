import React from 'react';

import PlayerTable from './PlayerTable'

function Drafted(props) {
  let players = props.players.slice().filter(p => p.drafted);
  players = players.sort((a, b) => b.drafted - a.drafted);

  return (
    <div>
      <button
        className='btn btn-sm btn-info'
        onClick={()=>props.undo(props.currentDraft)}>
        Undo
      </button>

      <button
        className='btn btn-sm btn-warning' onClick={()=>props.reset()}>
        Reset
      </button>

      <PlayerTable
        fields={props.fields}
        players={players}
      />
    </div>
  );
}

export default Drafted
