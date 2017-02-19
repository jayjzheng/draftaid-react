import React, { Component } from 'react';

import PlayerList from './PlayerList'

class DraftBoard extends Component {
    constructor() {
        super();
        this.state = {
            players: [
                { position: "RB1", name: "Todd Gurley", team: "LA", rank: 4, tier: 1, bye_week: 8, drafted: false },
                { position: "WR2", name: "Odell Beckham Jr.", team: "NYG", rank: 2, tier: 1, bye_week: 8, drafted: false },
                { position: "WR1", name: "Antonio Brown", team: "PIT", rank: 1, tier: 1, bye_week: 8, drafted: false },
                { position: "WR3", name: "Julio Jones", team: "ATL", rank: 3, tier: 1, bye_week: 11, drafted: false },
                { position: "RB2", name: "David Johnson", team: "ARI", rank: 5, tier: 1, bye_week: 9, drafted: false },
            ],
        };
    }

    render() {
        return (
            <div className="draft-board">
                <PlayerList players={this.state.players} />
                <hr />
                <PlayerList players={this.state.players} position="RB" />
                <hr />
                <PlayerList players={this.state.players} position="WR" />
                <hr />
                <PlayerList players={this.state.players} position="QB" />
                <hr />
                <PlayerList players={this.state.players} position="TE" />
            </div>
        );
    }
}

export default DraftBoard;
