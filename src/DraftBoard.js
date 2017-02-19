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

    draft(player) {
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

    undo(currentDraft) {
        const players = this.state.players.slice();
        const index = players.findIndex(p => p.drafted === currentDraft);
        if (~index) {
            players[index].drafted = null;
        }

        this.setState({
            currentDraft: this.state.currentDraft - 1,
            players: players,
        });
    }

    reset() {
        const players = this.state.players.slice();
        players.map((player, i) => {
            return player.drafted = null;
        });

        this.setState({
            currentDraft: 0,
            players: players,
        });
    }

    render() {
        return (
            <div className="draft-board">
                <PlayerList players={this.state.players} onClick={(p)=>this.draft(p)} />
                <hr />
                <PlayerList players={this.state.players} position="RB" onClick={(p)=>this.draft(p)} />
                <hr />
                <PlayerList players={this.state.players} position="WR" onClick={(p)=>this.draft(p)} />
                <hr />
                <PlayerList players={this.state.players} position="QB" onClick={(p)=>this.draft(p)} />
                <hr />
                <PlayerList players={this.state.players} position="TE" onClick={(p)=>this.draft(p)} />
                <hr />
                <Drafted
                    players={this.state.players}
                    currentDraft={this.state.currentDraft}
                    undo={ (cd) => this.undo(cd) }
                    reset={ () => this.reset() }
                    />
            </div>
        );
    }
}

export default DraftBoard;
