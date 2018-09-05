import React, { Component } from 'react'
import Resource from '../components/Resource'
import { inject, observer } from "mobx-react"

class Account extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const acctName = this.acctName.value
    this.props.AccountStore.loadAccount(acctName)
  }  

  render() {
    const {AccountStore} = this.props
    
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <span>Account Name: </span>
          <input type="text" placeholder="Account name" ref={input => this.acctName = input} />
          <button>
            Lookup Account
          </button>
        </form>

        {AccountStore.account !== null &&
          <div>
            <Resource type="net" resource={AccountStore.account.net_limit} />
            <Resource type="cpu" resource={AccountStore.account.cpu_limit} />
          </div>
        }
      </div>
    )
  }
}

export default inject('AccountStore')(observer(Account))