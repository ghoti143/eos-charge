import React, { Component } from 'react'
import Resource from '../components/Resource'
import { inject, observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Account extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const acctName = this.acctName
    this.props.AccountStore.loadAccount(acctName)
  }  

  handleChange = name => e => {
    this[name] = e.target.value
  }

  render() {
    const {AccountStore} = this.props
    
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <TextField label="Account Name" placeholder="Enter Account Name" onChange={this.handleChange('acctName')} />
          <Button variant="contained" type="submit">
            Lookup Account
          </Button>
        </form>

        {AccountStore.account !== null &&
          <div class="resource-group">
            <Resource type="net" resource={AccountStore.account.net_limit} />
            <Resource type="cpu" resource={AccountStore.account.cpu_limit} />
          </div>
        }
      </div>
    )
  }
}

export default inject('AccountStore')(observer(Account))