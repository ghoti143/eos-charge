import {
  REQUEST_AGGREGATIONS,
  RECEIVE_AGGREGATIONS,
  INVALIDATE_AGGREGATIONS
} from '../actions/aggregation'

export function aggregation(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_AGGREGATIONS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_AGGREGATIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_AGGREGATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}