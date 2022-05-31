import React from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((key) => (
          <div
            key={key}
            className={`cog ${props.wheel === key ? 'active' : ''}`}
            style={{ "--i": key }}
          >
            {props.wheel === key ? 'B' : null}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect((st) => st, actionCreators)(Wheel);
