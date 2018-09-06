import React, { Component } from 'react'
import './Aggregations.css'

export default class Aggregations extends Component {
  render() {
    return (
      
      <div id="actions">
        {this.props.aggregations.map((agg, i) => (
          <div class="top_action" key={i}>
            <label>Account:</label>
            <span>{agg._id.acct}</span>
            <label>Name:</label>
            <span>{agg._id.name}</span>
            <label>Avg CPU:</label>
            <span>{agg.avg_cpu_us}</span>
            <label>Avg NET:</label>
            <span>{agg.avg_net_words}</span>
            <label>How many actions:</label>
            <span>{agg.acct_num_actions}</span>
          </div>
        ))}
      </div>
    )
  }
}