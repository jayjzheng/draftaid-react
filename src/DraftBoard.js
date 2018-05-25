import React, { Component } from 'react';

import UndraftedAll from './UndraftedAll'
import UndraftedPositions from './UndraftedPositions'
import Drafted from './Drafted'

class DraftBoard extends Component {
    constructor() {
      super();

      this.state = {
          players: [],
          filteredPlayers: [],
          isLoading: true,
          currentDraft: 0,
          fetchError: null,
          format: 'standard',
          query: '',
      };
    }

    componentDidMount() {
      this.fetchPlayers(this.state.format);
    }

    fetchPlayers(format) {
      // const url = 'https://draftaid-api.herokuapp.com/rankings';
      const url = 'https://jayzheng-ff-api.herokuapp.com/rankings';
      const self = this;

      fetch(url+'?format='+format, {
        method: 'get'
      }).then(function(response) {
        response.json().then(function(res){
          self.setState({
            players: res.rankings,
            filteredPlayers: res.rankings,
            isLoading: false,
            format: format,
            query: '',
          });
        });
      }).catch(function(err) {
        self.setState({
          fetchError: err,
          isLoading: false,
        });
      });
    }

    searchPlayers(query) {
      let players = this.state.players.filter(player =>
        player.name.toUpperCase().includes(query.toUpperCase())
      );

      this.setState({
        filteredPlayers: players,
        query: query,
      });
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
          filteredPlayers: players,
          query: '',
      });
    }

    undo(currentDraft) {
      if(currentDraft === 0) {
        return
      }

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
      if (this.state.isLoading) {
        return (<div className='row'>Loading...</div>)
      }

      if (this.state.fetchError) {
        return (<div className='row'>error fetching rankings...</div>)
      }

      return (
        <div className='row'>
          <UndraftedAll
            players={ this.state.filteredPlayers }
            draft={ (p) => this.draft(p) }
            fetch={ (e) => this.fetchPlayers(e.target.value) }
            search={ (e) => this.searchPlayers(e.target.value) }
            format={ this.state.format }
            query={ this.state.query }
          />

          <UndraftedPositions
            players={ this.state.players }
            draft={(p) => this.draft(p)}
          />

          <Drafted
              currentDraft={ this.state.currentDraft }
              players={ this.state.players }
              undo={ (c) => this.undo(c) }
              reset={ () => this.reset() }
          />
        </div>
      );
    }
}

export default DraftBoard;
