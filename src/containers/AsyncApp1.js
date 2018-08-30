import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchAggregationsIfNeeded
} from '../actions'
import Aggregations from '../components/Aggregations'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchAggregationsIfNeeded())
  }

  componentDidUpdate(prevProps) {
    /*
    const { dispatch } = this.props
    dispatch(fetchAggregationsIfNeeded())
    */
    
  }

  handleChange() {
    this.props.dispatch(fetchAggregationsIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchAggregationsIfNeeded())
  }

  render() {
    const { aggs, isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>}
        </p>
        {isFetching && aggs.length === 0 && <h2>Loading...</h2>}
        {!isFetching && aggs.length === 0 && <h2>Empty.</h2>}
        {aggs.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Aggregations aggregations={aggs} />
          </div>}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  aggs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { aggregations } = state
  const {
    isFetching,
    lastUpdated,
    items: aggs
  } = aggregations || {
    isFetching: true,
    items: []
  }

  return {
    aggs,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)