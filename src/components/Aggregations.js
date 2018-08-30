import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Aggregations extends Component {
  render() {
    return (
      
      <table>
        <thead>
          <tr>
            <td>account</td>
            <td>name</td>
            <td>avg_cpu_us</td>
            <td>avg_net_words</td>
            <td>count</td>
          </tr>
        </thead>
        <tbody>
        {this.props.aggregations.map((agg, i) => (
          <tr key={i}>
            <td>{agg._id.acct}</td>
            <td>{agg._id.name}</td>
            <td>{agg.avg_cpu_us}</td>
            <td>{agg.avg_net_words}</td>
            <td>{agg.count}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}

Aggregations.propTypes = {
  aggregations: PropTypes.array.isRequired
}