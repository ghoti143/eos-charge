import {observable, decorate} from 'mobx'

class AccountStore {
  account = null
  loading = false
  accountError = null
  acctNameDirty = false

  loadAccount = name => {
    this.loading = true
    this.error = null
    this.acctNameDirty = false
    
    fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': name})
    })
      .then(response => {
        this.loading = false
        
        if (response.status === 500) {
          throw Error(`Account ${name} not found.`);
        }
        
        return response.json()
      })
      .then(data => this.account = data)
      .catch(error => this.error = error)
  }
}

decorate(AccountStore, {
  account: observable,
  loading: observable,
  error: observable,
  acctNameDirty: observable
})

const store = new AccountStore()
export default store