import React, { Component } from 'react';

import UndraftedAll from './UndraftedAll'
import UndraftedPositions from './UndraftedPositions'
import Drafted from './Drafted'
import data from '../data/players.json';

class DraftBoard extends Component {

    constructor(props) {
      super(props);

      this.state = {
          players: [],
          filteredPlayers: [],
          isLoading: true,
          currentDraft: 0,
          fetchError: null,
          format: 'standard',
          query: '',
          teams: 12,
          pick: 1,
          picks:[1,24,25,48,49,72,73,96,97,120,121,144,145,168,169,192],
          nextPick: 1,
          pickAfter: 2,
      };
    }

    componentDidMount() {
      this.fetchPlayers(this.state.format);
      this.setNextPicks();
      this.updatePlayerValues();

    }
    fetchPlayers(format) {
        const self = this;
                self.setState({
                    players: data.rankings,
                    filteredPlayers: data.rankings,
                    isLoading: false,
                    format: format,
                    query: '',
                });
        }

    async updateTeams(teamIn) {
        teamIn = Number(teamIn);
        await this.setState({
            teams: teamIn,
        });
        await this.setPicks();
    }

    async updatePick(pickIn) {
        pickIn = Number(pickIn);
        if (pickIn > this.state.teams) {
            pickIn = this.state.teams;
        }
        if (pickIn < 1) {
            pickIn = 1;
        }
        await this.setState({
            pick: pickIn,
        })
        await this.setPicks()
    }

    async setPicks() {
        let newPicks = [];
        for (let round = 1; round <= 16; round++) {
            let draftpick;
            if (round % 2 === 0) {
                draftpick = (round * this.state.teams) - this.state.pick + 1
            } else {
                draftpick = (round - 1) * this.state.teams + Number(this.state.pick);
            }
            newPicks.push(draftpick);
        }
        await this.setState({picks: newPicks})
        await this.setNextPicks()
    }
    async setNextPicks() {
        for (let round = 1; round <= 16; round++) {
            if (this.state.picks[round - 1] >= this.state.currentDraft) {
                if(this.state.picks[round-1]+1===this.state.picks[round]){
                    await this.setState({
                        nextPick: this.state.picks[round-1],
                        pickAfter: this.state.picks[round+1]
                    });
                }else{
                await this.setState({
                    nextPick: this.state.picks[round-1],
                    pickAfter: this.state.picks[round]
                });}
                break;
            }
        }
        this.updatePlayerValues();
    }

    updatePlayerValues(){
        let nextQB = 0;
        let nextRB = 0;
        let nextWR = 0;
        let nextTE = 0;
        let nextK = 0;
        let nextDST = 0;
        let pPlayers = this.state.filteredPlayers;
        let pickWindow = this.state.pickAfter - this.state.currentDraft;
        pPlayers.forEach((player, index)=>{
            switch(player.position) {
                case 'QB':
                    if(nextQB === 0 && (index+1)>pickWindow){
                        nextQB = player.fpts;
                    }
                    break;
                case 'RB':
                    if(nextRB === 0 && (index+1)>pickWindow){
                        nextRB = player.fpts;
                    }
                    break;
                case 'WR':
                    if(nextWR === 0 && (index+1)>pickWindow){
                        nextWR = player.fpts;
                    }
                    break;
                case 'TE':
                    if(nextTE === 0 && (index+1)>pickWindow){
                        nextTE = player.fpts;
                    }
                    break;
                case 'K':
                    if(nextK === 0 && (index+1)>pickWindow){
                        nextK = player.fpts;
                    }
                    break;
                case 'DST':
                    if(nextDST === 0 && (index+1)>pickWindow){
                        nextDST = player.fpts;
                    }
                    break;
                default:
            }
        })
        pPlayers.forEach((player, index)=>{
            switch(player.position) {
                case 'QB':
                    player.diff = Math.round(player.fpts - nextQB)
                    break;
                case 'RB':
                    player.diff = Math.round(player.fpts - nextRB)
                    break;
                case 'WR':
                    player.diff = Math.round(player.fpts - nextWR)
                    break;
                case 'TE':
                    player.diff = Math.round(player.fpts - nextTE)
                    break;
                case 'K':
                    player.diff = Math.round(player.fpts - nextK)
                    break;
                case 'DST':
                    player.diff = Math.round(player.fpts - nextDST)
                    break;
                default:
            }
        })

        this.setState({
            filteredPlayers: pPlayers
        })

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

    async draft(player) {
        const players = this.state.players.slice();
        const index = players.indexOf(player);
        if (~index) {
            players[index].drafted = this.state.currentDraft + 1;
        }

        await this.setState({
            currentDraft: this.state.currentDraft + 1,
            players: players,
            filteredPlayers: players,
            query: '',
        });
    }

    undo(currentDraft) {
        if (currentDraft === 0) {
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
                    players={this.state.filteredPlayers}
                    draft={(p) => this.draft(p).then((p)=>this.setNextPicks())}
                    fetch={(e) => this.fetchPlayers(e.target.value)}
                    search={(e) => this.searchPlayers(e.target.value)}
                    updateTeams={(e) => this.updateTeams(e.target.value).then((p)=>this.setPicks())}
                    updatePick={(e) => this.updatePick(e.target.value).then((p)=>this.setPicks())}
                    format={this.state.format}
                    query={this.state.query}
                    teams={this.state.teams}
                    pick={this.state.pick}
                />

                <UndraftedPositions
                    players={this.state.players}
                    draft={(p) => this.draft(p).then((p)=>this.setNextPicks())}
                    currentPick={this.state.currentDraft}
                    nextPick={this.state.nextPick}
                    pickAfter={this.state.pickAfter}
                    picks={this.state.picks}
                />

                <Drafted
                    currentDraft={this.state.currentDraft}
                    players={this.state.players}
                    undo={(c) => this.undo(c).then((p)=>this.setNextPicks())}
                    reset={() => this.reset().then((p)=>this.setNextPicks())}
                />
            </div>
        );
    }
}

export default DraftBoard;
