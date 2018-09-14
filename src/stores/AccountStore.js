import {observable, action, decorate} from 'mobx'

const defaultAccount = {
  net_limit: {used: 100, available: 0, max: 100},
  cpu_limit: {used: 100, available: 0, max: 100}
}

class AccountStore {
  account = defaultAccount
  state = 'init'
  error = null
  accountName = null
  
  setAccountName = name => {
    this.accountName = name
    this.state = 'init'
  }

  setAccount = data => {
    this.account = data
    this.state = 'done'
  }

  handleError = error => {
    this.error = error
    this.state = 'error'
    this.account = defaultAccount
  }

  loadAccount = name => {
    this.state = 'pending'
    
    fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': this.accountName})
    })
      .then(response => {

        if (response.status === 500) {
          throw Error(`Account ${this.accountName} not found.`);
        }
        
        return response.json()
      })
      .then(this.setAccount)
      .catch(this.handleError)
  }
}

decorate(AccountStore, {
  account: observable,
  state: observable,
  error: observable,
  accountName: observable,
  setAccountName: action
})

const store = new AccountStore()
export default store