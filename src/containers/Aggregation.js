import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Aggregations from '../components/Aggregations'
import {
  fetchAggregationsIfNeeded,
  invalidateAggregations
} from '../actions/aggregation'

class Aggregation extends Component {
  constructor(props) {
    super(props)
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

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateAggregations())
    dispatch(fetchAggregationsIfNeeded())
  }

  render() {
    const { items, isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Aggregations last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isFetching && items.length === 0 && <h2>Loading...</h2>}
        {!isFetching && items.length === 0 && <h2>Empty.</h2>}
        {items.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Aggregations aggregations={items} />
          </div>
        }
      </div>
    )
  }
}

Aggregation.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { aggregation } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = aggregation || {
    isFetching: true,
    items: []
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Aggregation)