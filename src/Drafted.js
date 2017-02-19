import React from 'react';

function Drafted(props) {
    const filtered = props.players.filter(p => p.drafted);
    const sorted = filtered.sort((a, b) => b.drafted - a.drafted);
    const players = sorted.map((player, i) => {
      return (
        <tr key={i}>
          <td>{player.drafted}</td>
          <td>{player.position}</td>
          <td>{player.name}</td>
          <td>{player.team}</td>
        </tr>
      );
    });

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

        <table className='table'>
          <tbody>{players}</tbody>
        </table>
      </div>
    );
}

export default Drafted
