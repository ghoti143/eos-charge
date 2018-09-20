import {observable, action, decorate, computed} from 'mobx'
import AccountStore from './AccountStore'

class ActionStore {
  aggregations = [];
  blacklist = ['blocktwitter', 'eosio.token']

  loadAggregations = name => {
    const cachebust = (new Date()).getTime()
    fetch(`https://www.eossnapshots.io/data/eoscharge/latest.json?ts=${cachebust}`)
      .then(response => response.json())
      .then(data => this.setAggregations(data))    
  }

  setAggregations = aggregations => {
    this.aggregations = aggregations
  }

  get sortedList() {
    let sortedList = this.aggregations.filter(agg => {
      return !this.blacklist.includes(agg._id.acct)
    })
    sortedList.sort((a, b) => { return b.count - a.count })

    sortedList.forEach(agg => {
      agg.acct_num_actions = this.calcActions(agg.avg_cpu_us)
    })
    
    return sortedList
  }

  get popularActions() {
    let sortedList = this.aggregations.filter(agg => {
      return !this.blacklist.includes(agg._id.acct)
    })
    sortedList.sort((a, b) => { return b.count - a.count })

    sortedList = sortedList.slice(0, 3)

    sortedList.forEach(agg => {
      agg.acct_num_actions = this.calcActions(agg.avg_cpu_us)
    })
    
    return sortedList
  }

  calcActions = cpu => {
    if(AccountStore.account) {
      return AccountStore.account.cpu_limit.available / cpu
    } else {
      return 0
    }
  }
}

decorate(ActionStore, {
  aggregations: observable,
  setAggregations: action,
  sortedList: computed
})

const store = new ActionStore()
export default store