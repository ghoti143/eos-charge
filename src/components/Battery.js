import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  batteryContainer: {
    position: 'relative'
  },
  percentLabel: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    color: 'white',
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)'
  }
})

class Battery extends Component {
  
  calculatePercent = resource => {
    let available = resource.available
    let max = resource.max

    return Math.round(available / max * 100)
  }
  
  createSvgPath = pct => {
    var max = 5.5
    var min = 20.5
    var minv = 0.17

    var delta = (min - max) * (pct/100) 
    var var1 = min - delta;
    var var2 = minv + delta;
    return `M7 ${var1}v${var2}C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V${var1}H7z`
  }

  render() {
    const {classes} = this.props
    let pct = this.calculatePercent(this.props.resource)
    let svgPath = this.createSvgPath(pct)
    let color = pct > 20 ? 'green' : 'red'

    return (
      <React.Fragment>
        <Typography variant="headline" align="center">{this.props.type.toUpperCase()}</Typography>
        <div className={classes.batteryContainer}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-opacity="0.3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V20.5h10V5.33z"></path>
            <path d={svgPath} fill={color}></path>
            <path fill="none" d="M0 0h24v24H0z"></path>
          </svg>
          <Typography className={classes.percentLabel} variant="display1" align="center">{`${pct}%`}</Typography>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Battery)