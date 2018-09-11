import React, { Component } from 'react'
import Account from './Account'
import Aggregation from './Aggregation'
import { Provider } from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AggregationStore from "../stores/AggregationStore";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            EOS Charge
          </Typography>
        </Toolbar>
      </AppBar>        
        <Provider store={AccountStore}>
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