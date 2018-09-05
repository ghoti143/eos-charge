import {observable, action, decorate} from 'mobx'

class AccountStore {
  account = null;

  loadAccount = name => {
    fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': name})
    })
      .then(response => response.json())
      .then(data => this.setAccount(data))
  }

  setAccount = account => {
    this.account = account
  }
}

decorate(AccountStore, {
  account: observable,
  setAccount: action
})

const store = new AccountStore()
export default store