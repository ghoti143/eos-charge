import React, { Component } from 'react'
import Account from './Account'
import Aggregation from './Aggregation'

export default class App extends Component {
  render() {
    return (
      <div>
        <Account />
        <hr />
        <Aggregation />
      </div>
    )
  }
}