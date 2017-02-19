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
      console.log('draft', player.name);

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
      console.log('undo');

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
      console.log('reset');

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
          <Undrafted
            fields={['rank', 'tier', 'position', 'name', 'team', 'bye_week']}
            position='WR'
            players={ this.state.players }
            size={10}
            draft={ (p) => this.draft(p) }
          />

          <Drafted
            fields={['drafted', 'name', 'position', 'team']}
            position='WR'
            currentDraft={ this.state.currentDraft }
            players={ this.state.players }
            undo={ (cd) => this.undo(cd) }
            reset={ () => this.reset() }
          />
        </div>
      );
    }
}

export default DraftBoard;
