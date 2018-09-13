import React, { Component } from 'react'
import './Battery.css'

export default class Battery extends Component {
  render() {
    
    var available = this.props.resource.available
    var used = this.props.resource.used
    var max = this.props.resource.max
    
    var pct = Math.round(available / max * 100)

    var levelStyle = {
      height: `${pct}%`
    }

    return (
      <React.Fragment>
        <h3>{this.props.type}</h3>
        <div className="battery">
          <div className="battery-level" style={levelStyle}></div>
          <div className="battery-pct">
            {`${pct}%`}
          </div>
        </div>
      </React.Fragment>
    )
  }
}