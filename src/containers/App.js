import React, { Component } from 'react'
import Account from './Account'
import Aggregation from './Aggregation'
import { Provider } from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AggregationStore from "../stores/AggregationStore";

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider AccountStore={AccountStore}>
          <Account />
        </Provider>
        <hr />
        <Provider AggregationStore={AggregationStore}>
          <Aggregation />
        </Provider>
      </div>
    )
  }
}