import {observable, decorate} from 'mobx'

class AccountStore {
  account = null
  accountLoading = false
  accountError = null

  loadAccount = name => {
    this.accountLoading = true
    this.accountError = null
    
    fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': name})
    })
      .then(response => {
        this.accountLoading = false
        
        if (response.status === 500) {
          throw Error(`Account ${name} not found.`);
        }
        
        return response.json()
      })
      .then(data => this.account = data)
      .catch(error => this.accountError = error)
  }
}

decorate(AccountStore, {
  account: observable,
  accountLoading: observable,
  accountError: observable
})

const store = new AccountStore()
export default store