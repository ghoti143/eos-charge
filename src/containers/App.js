import React, {Component} from 'react'
import Account from './Account'
import Aggregation from './Aggregation'
import {Provider} from "mobx-react";
import withStyles from '@material-ui/core/styles/withStyles';
import AccountStore from "../stores/AccountStore";
import AggregationStore from "../stores/AggregationStore";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import {Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 3,
    width: 40,
    height: 40
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    }
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
          <Grid container spacing={24}>            
            <Grid item xs="12" sm="12" md="12" lg="6">
              <Provider store={AccountStore}>
                <Account />
              </Provider>
            </Grid>
            <Grid item xs="12" sm="12" md="12" lg="6">
              <Paper className={classes.paper}>Item 1</Paper>
              <Paper className={classes.paper}>Item 2</Paper>
              <Paper className={classes.paper}>Item 3</Paper>
            </Grid>
          </Grid>
        <Provider store={AggregationStore}>
          <Aggregation />
        </Provider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)