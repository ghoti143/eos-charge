import React, { Component } from 'react'

export default class Resource extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.type}</h3>
        available: {this.props.resource.available}
        <br />
        used: {this.props.resource.used}
        <br />
        max: {this.props.resource.max}
      </div>
    )
  }
}