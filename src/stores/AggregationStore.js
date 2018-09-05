import {observable, action, decorate} from 'mobx'

class AggregationStore {
  aggregations = [];

  loadAggregations = name => {
    const cachebust = (new Date()).getTime()
    fetch(`https://www.eossnapshots.io/data/eoscharge/latest.json?ts=${cachebust}`)
      .then(response => response.json())
      .then(data => this.setAggregations(data))    
  }

  setAggregations = aggregations => {
    this.aggregations = aggregations
  }
}

decorate(AggregationStore, {
  aggregations: observable,
  setAggregations: action
})

const store = new AggregationStore()
export default store