import React, { Component } from 'react'
import Aggregations from '../components/Aggregations'
import { inject, observer } from "mobx-react"

class Aggregation extends Component {
  componentDidMount() {
    this.props.AggregationStore.loadAggregations()    
  }

  render() {
    const {AggregationStore} = this.props
    
    return (
      <div>
        {AggregationStore.aggregations.length > 0 &&          
          <div>
            <Aggregations aggregations={AggregationStore.topFive} />
          </div>
        }
      </div>
    )
  }
}

export default inject('AggregationStore')(observer(Aggregation))