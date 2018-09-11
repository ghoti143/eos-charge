import React, { Component } from 'react'
import Resource from '../components/Resource'
import { inject, observer } from 'mobx-react'
import './Account.css'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CheckIcon from '@material-ui/icons/Check';
import SyncIcon from '@material-ui/icons/Sync';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

class Account extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const acctName = this.acctName
    this.props.store.loadAccount(acctName)
  }  

  handleChange = name => e => {
    this[name] = e.target.value
    this.props.store.error = null
    this.props.store.acctNameDirty = true
  }

  render() {
    const {store} = this.props
    
    return (
      <div>
        <div className="acct_main">
          <Paper className="acct_paper">
            <Typography variant="headline">Lookup Account</Typography>
            <form className="acct_form" onSubmit={e => this.handleSubmit(e)}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="acct_name">Account Name</InputLabel>
                <Input id="acct_name" 
                       name="acct_name" 
                       placeholder="Enter EOS Account Name" 
                       autoFocus 
                       onChange={this.handleChange('acctName')} />
              </FormControl>
              <div className="btn_wrapper">
                <Button variant="fab" 
                        color="primary" 
                        type="submit" 
                        disabled={store.loading || store.error} 
                        className="acct_submit">
                  {store.error ? <SyncProblemIcon />
                    : store.account !== null && !store.acctNameDirty ? <CheckIcon />
                    : <SyncIcon />}
                </Button>
                {store.loading &&
                  <CircularProgress size={68} className="btn_progress" />
                }
              </div>
              {store.error && 
                <FormLabel error="true">{store.error.message}</FormLabel>
              }
            </form>
          </Paper>
        </div>

        {store.account !== null &&
          <div className="resource-group">
            <Resource type="net" resource={store.account.net_limit} />
            <Resource type="cpu" resource={store.account.cpu_limit} />
          </div>
        }
      </div>
    )
  }
}

export default inject('store')(observer(Account))