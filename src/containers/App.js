import React, {Component} from 'react'
import Account from './Account'
import Aggregation from './Aggregation'
import PopularActions from './PopularActions'
import {Provider} from "mobx-react";
import withStyles from '@material-ui/core/styles/withStyles';
import AccountStore from "../stores/AccountStore";
import AggregationStore from "../stores/AggregationStore";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 3,
    width: 40,
    height: 40
  },
  layout: {
    marginTop: theme.spacing.unit * 2    
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
        <Grid container className={classes.layout} spacing={16}>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <Typography variant="display1" align="center">Check Your Charge</Typography>
            <Provider store={AccountStore}>
              <Account />
            </Provider>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <Typography variant="display1" align="center">Popular Action Cost</Typography>
            <Provider store={AggregationStore}>
              <PopularActions />
            </Provider>            
          </Grid>
          <Grid item xs={12}>
            <Typography variant="display1" align="center">More Actions</Typography>
            <Provider store={AggregationStore}>
              <Aggregation />
            </Provider>
          </Grid>
        </Grid>        
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App)