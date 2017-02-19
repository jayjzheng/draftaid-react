import React from 'react';

function PlayerList(props) {
    let filtered;
    if (props.position) {
        filtered = props.players.filter(p => p.position.includes(props.position));
    } else {
        filtered = props.players;
    }

    const sorted = filtered.sort((a, b) => a.rank - b.rank);
    const players = sorted.map((player, i) => {
      return (
        <tr key={i}>
            <td>{player.rank}</td>
            <td>Tier {player.tier}</td>
            <td>{player.position}</td>
            <td>{player.name}</td>
            <td>{player.team}</td>
            <td>{player.bye_week}</td>
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

export default PlayerList
