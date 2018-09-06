import {observable, action, decorate, computed} from 'mobx'
import AccountStore from './AccountStore'

class AggregationStore {
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

  get topFive() {
    let topFive = this.aggregations.filter(agg => {
      return this.blacklist.indexOf(agg._id.acct) === -1
    })
    topFive.sort((a, b) => { return b.count - a.count })

    topFive = topFive.slice(0, 5)

    topFive.forEach(agg => {
      agg.acct_num_actions = this.calcActions(agg.avg_cpu_us)
    })
    
    return topFive
  }

  calcActions = cpu => {
    if(AccountStore.account) {
      return AccountStore.account.cpu_limit.available / cpu
    } else {
      return -1
    }
  }
}

decorate(AggregationStore, {
  aggregations: observable,
  setAggregations: action,
  topFive: computed
})

const store = new AggregationStore()
export default store