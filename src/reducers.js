import { combineReducers } from 'redux'
import {
  CHANGE_ACCOUNT_NAME,
  REQUEST_ACCOUNT,
  RECEIVE_ACCOUNT,
  REQUEST_AGGREGATIONS,
  RECEIVE_AGGREGATIONS,
  INVALIDATE_AGGREGATIONS,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './actions'

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function account(
  state = {
    name: '',
    data: {}
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

function aggregations(
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
        items: action.aggregations,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  aggregations,
  account,
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer