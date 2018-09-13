import React, { Component } from 'react'
import Account from './Account'
import Aggregation from './Aggregation'
import { Provider } from "mobx-react";
import withStyles from '@material-ui/core/styles/withStyles';
import AccountStore from "../stores/AccountStore";
import AggregationStore from "../stores/AggregationStore";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 3,
    width: 40,
    height: 40
  }
});

class App extends Component {
  render() {
    const {classes} = this.props
    
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
        <Toolbar>
          <OfflineBoltIcon className={classes.icon} />
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

export default withStyles(styles)(App)