import {observable, action, decorate, computed} from 'mobx'

class ActionStore {
  actions = []
  isLoaded = false
  blacklist = ['foobar']
  popContent = {
    'monstereosio:feedpet': {
      img: 'monster-105.png',
      title: "MonsterEOS: Feed Pet", 
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to feed your pet <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'eosbetdice11:resolvebet': {
      img: 'eosbet-logo-textside-azure.png',
      title: "EOSBET: Resolve Bet", 
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to resolve <strong>$COUNT</strong> bets in the next 72 hours.'
    },
    'eosknightsio:sellmat': {
      img: 'knights.jpg',
      title: "EOS Knights: Sell Material", 
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to sell <strong>$COUNT</strong> materials in the next 72 hours.'
    }
  }
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
    const actions = this.actions.filter(action => {
      return `${action._id.acct}:${action._id.name}` in this.popContent
    })

    const popularActions = actions.map(action => {
      const popContent = this.popContent[`${action._id.acct}:${action._id.name}`]
      return {...action, ...popContent}
    })

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