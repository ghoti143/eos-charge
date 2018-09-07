import React, { Component } from 'react'
import './Resource.css'

export default class Resource extends Component {
  render() {
    return (
      <div className="resource">
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