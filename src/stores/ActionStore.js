import {observable, action, decorate, computed} from 'mobx'

class ActionStore {
  actions = []
  isLoaded = false
  blacklist = ['blocktwitter', 'eosio.token']

  loadActions = name => {
    const cachebust = (new Date()).getTime()
    fetch(`https://www.eossnapshots.io/data/eoscharge/latest.json?ts=${cachebust}`)
      .then(response => response.json())
      .then(data => this.setActions(data))    
  }

  setActions = actions => {
    this.actions = actions.filter(agg => {
      return !this.blacklist.includes(agg._id.acct)
    })
    this.actions = this.actions.slice().sort((a, b) => { return b.count - a.count })
    this.isLoaded = true;
  }

  get sortedList() {
    return this.actions
  }

  get popularActions() {
    const popularActions = this.actions.slice(0, 3)
    return popularActions
  }
}

decorate(ActionStore, {
  isLoaded: observable,
  setActions: action,
  sortedList: computed,
  popularActions: computed,
  actions: observable
})

const store = new ActionStore()
export default store