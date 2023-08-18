import React from 'react';

import Undrafted from './Undrafted'

function UndraftedAll(props) {
  return (
    <div className='col-md-3 col-sm-12 col-xs-12'>
      <div className="row form-group">
        <div className="form-group">
          format:<select value={ props.format } onChange={ props.fetch } >
            <option value="standard">Standard</option>
            <option value="ppr">PPR</option>
            <option value="half_ppr">0.5 PPR</option>
          </select>
           #teams:<select value={ props.teams } onChange={ props.updateTeams } >
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
        </select>
          #pick:<input type="number" value={ props.pick } onChange={ props.updatePick } >
        </input>
        </div>
      <div className="aid-title hidden-xs">
        <i className="fa fa-sort-amount-asc"></i> Overall Rankings
      </div>

        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={props.search}
            value={ props.query }
          />
        </div>
      </div>

      <div className='scrollable overall-rankings'>
        <Undrafted
          fields={['rank', 'fpts','diff', 'position', 'name', 'team']}
          players={props.players}
          draft={(p) => props.draft(p)}
        />
      </div>
    </div>
  )
}

UndraftedAll.propTypes = {
  players: React.PropTypes.array.isRequired,
  format: React.PropTypes.string.isRequired,
  query: React.PropTypes.string.isRequired,
  search: React.PropTypes.func.isRequired,
  fetch: React.PropTypes.func.isRequired,
  updateTeams: React.PropTypes.func.isRequired,
  updatePick: React.PropTypes.func.isRequired,
};

export default UndraftedAll
