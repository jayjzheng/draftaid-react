import React from 'react';

import Undrafted from './Undrafted'

class UndraftedAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: props.players,
    };

    this.search = this.search.bind(this);
  }

  search(event) {
    let query = event.target.value;
    const players = this.props.players.filter(player =>
      player.name.toUpperCase().includes(query.toUpperCase())
    );

    this.setState({
      players: players,
    });
  }

  render() {
    return (
      <div className='col-md-3 col-sm-12 col-xs-12'>
        <div className="aid-title hidden-xs">
          <i className="fa fa-sort-amount-asc"></i> Overall Rankings
        </div>

        <div className="row form-group">
          <div className="form-group col-md-4">
            <select></select>
          </div>

          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={this.search}
            />
          </div>
        </div>

        <div className='scrollable overall-rankings'>
          <Undrafted
            fields={['rank', 'tier', 'position', 'name', 'team', 'bye_week']}
            players={this.state.players}
            draft={(p) => this.props.draft(p)}
          />
        </div>
      </div>
    );
  }
}

UndraftedAll.propTypes = {
  draft: React.PropTypes.func.isRequired,
  players: React.PropTypes.array.isRequired,
};

export default UndraftedAll
