import React, { Component } from 'react'
import Account from './Account'
import Aggregation from './Aggregation'
import { Provider } from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AggregationStore from "../stores/AggregationStore";
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider AccountStore={AccountStore}>
          <Account />
        </Provider>
        <hr />
        <Provider AggregationStore={AggregationStore}>
          <Aggregation />
        </Provider>
      </React.Fragment>
    )
  }
}