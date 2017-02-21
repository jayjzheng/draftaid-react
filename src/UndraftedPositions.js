import React from 'react';

import Undrafted from './Undrafted'

function UndraftedPositions(props) {
  return (
    <div className='col-md-6 col-sm-12 hidden-xs'>
      <div className='aid-title'>
        <i className='fa fa-signal'></i> Top Picks By Position
      </div>

      <div className='col-sm-6'>
        <span className="col-sm-12 position-title">Runningbacks</span>
        <Undrafted
          fields={['tier', 'name', 'team', 'bye_week']}
          players={props.players}
          draft={(p) => props.draft(p)}
          size={15}
          position='RB'
        />
      </div>

      <div className='col-sm-6'>
        <span className="col-sm-12 position-title">Wide Receivers</span>
        <Undrafted
          fields={['tier', 'name', 'team', 'bye_week']}
          players={props.players}
          draft={(p) => props.draft(p)}
          size={15}
          position='WR'
        />
      </div>

      <div className='col-sm-6'>
        <span className="col-sm-12 position-title">Quarterbacks</span>
        <Undrafted
          fields={['tier', 'name', 'team', 'bye_week']}
          players={props.players}
          draft={(p) => props.draft(p)}
          size={15}
          position='QB'
        />
      </div>

      <div className='col-sm-6'>
        <span className="col-sm-12 position-title">Tightends</span>
        <Undrafted
          fields={['tier', 'name', 'team', 'bye_week']}
          players={props.players}
          draft={(p) => props.draft(p)}
          size={15}
          position='TE'
        />
      </div>
    </div>
  )
}

export default UndraftedPositions
