export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS'
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS'
export const INVALIDATE_AGGREGATIONS = 'INVALIDATE_AGGREGATIONS'

export function invalidateAggregations() {
  return {
    type: INVALIDATE_AGGREGATIONS
  }
}

function requestAggregations() {
  return {
    type: REQUEST_AGGREGATIONS
  }
}

function receiveAggregations(json) {
  return {
    type: RECEIVE_AGGREGATIONS,
    items: json,
    receivedAt: Date.now()
  }
}

function fetchAggregations() {
  return dispatch => {
    dispatch(requestAggregations())
    const cachebust = (new Date()).getTime()
    return fetch(`https://www.eossnapshots.io/data/eoscharge/latest.json?ts=${cachebust}`)
      .then(response => response.json())
      .then(json => dispatch(receiveAggregations(json)))
  }
}

function shouldFetchAggregations(state) {
  const aggregation = state.aggregation
  if (aggregation.items.length === 0) {
    return true
  } else if (aggregation.isFetching) {
    return false
  } else {
    return aggregation.didInvalidate
  }  
}

export function fetchAggregationsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAggregations(getState())) {
      return dispatch(fetchAggregations())
    }
  }
}