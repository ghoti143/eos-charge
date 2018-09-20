import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {Provider} from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AccountForm from './AccountForm';
import AccountResources from './AccountResources';

const styles = theme => ({
  layout: {
    width: 'auto',
    
    [theme.breakpoints.only('sm')]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  }
})

class Account extends Component {  

  render() {
    const {classes} = this.props

    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Provider store={AccountStore}>
              <AccountForm />
            </Provider>
            <Provider store={AccountStore}>
              <AccountResources />
            </Provider>
          </Paper>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Account)