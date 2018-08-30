import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchAggregationsIfNeeded,
  invalidateAggregations,
  fetchAccountIfNeeded,
  changeAccountName
} from '../actions'
import Aggregations from '../components/Aggregations'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleAccountNameSubmit = this.handleAccountNameSubmit.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)    
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

  handleAccountNameSubmit(e) {
    e.preventDefault()

    const { dispatch, accountName } = this.props
    //dispatch(invalidateAggregations())
    dispatch(fetchAccountIfNeeded(accountName))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateAggregations())
    dispatch(fetchAggregationsIfNeeded())
  }

  updateInputValue(e) {
    const { dispatch } = this.props
    dispatch(changeAccountName(e.target.value))
  }

  render() {
    const { aggs, isFetching, lastUpdated, accountName, accountData } = this.props
    return (
      <div>
        <div>
          <input value={accountName} onChange={this.updateInputValue} />
          <button onClick={this.handleAccountNameSubmit}>
            Submit
          </button>
          <textarea value={JSON.stringify(accountData)}></textarea>
        </div>
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
  accountName: PropTypes.string,
  accountData: PropTypes.object,
  aggs: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { aggregations, account } = state
  const {
    isFetching,
    lastUpdated,
    items: aggs
  } = aggregations || {
    isFetching: true,
    items: []
  }

  const {
    name: accountName,
    data: accountData
  } = account || {
    name: '',
    data: {}
  }

  return {
    aggs,
    isFetching,
    lastUpdated,
    accountName,
    accountData
  }
}

export default connect(mapStateToProps)(AsyncApp)