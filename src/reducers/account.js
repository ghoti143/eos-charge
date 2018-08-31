import {
  CHANGE_ACCOUNT_NAME,
  REQUEST_ACCOUNT,
  RECEIVE_ACCOUNT
} from '../actions/account'

export function account(
  state = {
    name: '',
    data: {},
    lastUpdated: -1
  },
  action
) {
  switch (action.type) {
    case CHANGE_ACCOUNT_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    case REQUEST_ACCOUNT:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ACCOUNT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.account,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}