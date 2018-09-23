import {observable, action, decorate, computed} from 'mobx'

class ActionStore {
  actions = []
  isLoaded = false
  blacklist = ['foobar']
  filter = ''

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
    this.isLoaded = true;
  }

  setFilter = filter => {
    this.filter = filter.trim().toLowerCase()
  }

  get sortedList() {
    const actions = this.actions.filter(action => {
      return this.filter === '' ||
             action._id.acct.indexOf(this.filter) > -1 || 
             action._id.name.indexOf(this.filter) > -1
    })

    actions.sort((a, b) => {
      const compareAccount = a._id.acct.localeCompare(b._id.acct);
      const compareAction = a._id.name.localeCompare(b._id.name);

      return compareAccount || compareAction;
    })
    return actions
  }

  get popularActions() {
    const popularActions = this.actions.slice(0, 3)
    return popularActions
  }
}

decorate(ActionStore, {
  isLoaded: observable,
  setActions: action,
  setFilter: action,
  sortedList: computed,
  popularActions: computed,
  actions: observable,
  filter: observable
})

const store = new ActionStore()
export default store