import React, { Component } from 'react';

import PlayerList from './PlayerList'
import Drafted from './Drafted'

class DraftBoard extends Component {
    constructor() {
        super();
        this.state = {
            players: [
                { position: "RB1", name: "Todd Gurley", team: "LA", rank: 4, tier: 1, bye_week: 8 },
                { position: "WR2", name: "Odell Beckham Jr.", team: "NYG", rank: 2, tier: 1, bye_week: 8 },
                { position: "WR1", name: "Antonio Brown", team: "PIT", rank: 1, tier: 1, bye_week: 8 },
                { position: "WR3", name: "Julio Jones", team: "ATL", rank: 3, tier: 1, bye_week: 11  },
                { position: "RB2", name: "David Johnson", team: "ARI", rank: 5, tier: 1, bye_week: 9  },
            ],
            currentDraft: 0,
        };
    }

    handleClick(player) {
        const players = this.state.players.slice();
        const index = players.indexOf(player);
        if (~index) {
            players[index].drafted = this.state.currentDraft + 1;
        }

        this.setState({
            currentDraft: this.state.currentDraft + 1,
            players: players,
        });
    }

    render() {
        return (
            <div className="draft-board">
                <PlayerList players={this.state.players} onClick={(p) => this.handleClick(p)} />
                <hr />
                <PlayerList players={this.state.players} position="RB" onClick={(p) => this.handleClick(p)} />
                <hr />
                <PlayerList players={this.state.players} position="WR" onClick={(p) => this.handleClick(p)} />
                <hr />
                <PlayerList players={this.state.players} position="QB" onClick={(p) => this.handleClick(p)} />
                <hr />
                <PlayerList players={this.state.players} position="TE" onClick={(p) => this.handleClick(p)} />
                <hr />
                <Drafted players={this.state.players} />
            </div>
        );
    }
}

export default DraftBoard;
