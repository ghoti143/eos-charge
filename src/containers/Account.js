import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {Provider} from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AccountForm from './AccountForm';
import AccountResources from './AccountResources';

const styles = theme => ({
  foo: {
    height: 200
  }
})

class Account extends Component {  

  render() {
    const {classes} = this.props

    return (
      <div>
            <Provider store={AccountStore}>
              <AccountForm />
            </Provider>
            <Provider store={AccountStore}>
              <AccountResources />
            </Provider>        
      </div>
    )
  }
}

export default withStyles(styles)(Account)