import React from 'react';

function Drafted(props) {
    const filtered = props.players.filter(p => p.drafted);
    const sorted = filtered.sort((a, b) => a.drafted - b.drafted);
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
            <table>
                <tbody>{players}</tbody>
            </table>
        </div>
    );
}

export default Drafted
