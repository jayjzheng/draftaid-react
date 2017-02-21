import React from 'react';

import PlayerTable from './PlayerTable'

function Drafted(props) {
  let players = props.players.slice().filter(p => p.drafted);
  players = players.sort((a, b) => b.drafted - a.drafted);

  return (
    <div className='col-md-3 col-sm-12 col-xs-12'>
      <div className='aid-title hidden-xs'>
        <i className='fa fa-history'></i> Draft History
      </div>

      <button
        className='btn btn-sm btn-info btn-responsive'
        onClick={()=>props.undo(props.currentDraft)}>
        <i className='fa fa-backward'></i> Undo
      </button>

      <button
        className='pull-right btn btn-sm btn-warning btn-responsive'
        onClick={()=>props.reset()}>
        <i className='fa fa-eject'></i> Reset
      </button>

      <PlayerTable
        fields={props.fields}
        players={players}
      />
    </div>
  );
}

export default Drafted
