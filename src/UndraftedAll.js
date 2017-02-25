import React from 'react';

import Undrafted from './Undrafted'

function UndraftedAll(props) {
  return (
    <div className='col-md-3 col-sm-12 col-xs-12'>
      <div className="aid-title hidden-xs">
        <i className="fa fa-sort-amount-asc"></i> Overall Rankings
      </div>

      <div className="row form-group">
        <div className="form-group col-md-6">
          <select></select>
        </div>

        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </div>

      <div className='scrollable overall-rankings'>
        <Undrafted
          fields={['rank', 'tier', 'position', 'name', 'team', 'bye_week']}
          players={props.players}
          draft={(p) => props.draft(p)}
        />
      </div>
    </div>
  )
}

UndraftedAll.propTypes = {
  draft: React.PropTypes.func.isRequired,
  players: React.PropTypes.array.isRequired,
};

export default UndraftedAll
