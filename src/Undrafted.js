import React from 'react';

function Undrafted(props) {
    let filtered;
    if (props.position) {
        filtered = props.players.filter(p => p.position.includes(props.position) && !p.drafted);
    } else {
        filtered = props.players.filter(p => !p.drafted);
    }

    const sorted = filtered.sort((a, b) => a.rank - b.rank);
    const players = sorted.map((player, i) => {
      return (
        <tr key={i} onClick={() => props.onClick(player)}>
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
        <table>
            <tbody>{players}</tbody>
        </table>
    );
}

export default Undrafted
