import React, { Component } from 'react';

import Undrafted from './Undrafted'
import Drafted from './Drafted'
import rankings from '../public/rankings.json';

class DraftBoard extends Component {
    constructor() {
        super();
        this.state = {
            players: rankings.players,
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
                <Undrafted players={this.state.players} onClick={(p)=>this.draft(p)} />
                <hr />
                <Undrafted players={this.state.players} position="RB" onClick={(p)=>this.draft(p)} />
                <hr />
                <Undrafted players={this.state.players} position="WR" onClick={(p)=>this.draft(p)} />
                <hr />
                <Undrafted players={this.state.players} position="QB" onClick={(p)=>this.draft(p)} />
                <hr />
                <Undrafted players={this.state.players} position="TE" onClick={(p)=>this.draft(p)} />
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
