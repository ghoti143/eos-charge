import fetch from 'cross-fetch'

export const CHANGE_ACCOUNT_NAME = 'CHANGE_ACCOUNT_NAME'
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT'
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'
export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS'
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS'
export const INVALIDATE_AGGREGATIONS = 'INVALIDATE_AGGREGATIONS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function changeAccountName(name) {
  return {
    type: CHANGE_ACCOUNT_NAME,
    name
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function requestAccount(accountName) {
  return {
    type: REQUEST_ACCOUNT,
    accountName
  }
}

function receiveAccount(accountName, json) {
  return {
    type: RECEIVE_ACCOUNT,
    accountName,
    account: json,
    receivedAt: Date.now()
  }
}

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
    aggregations: json,
    receivedAt: Date.now()
  }
}

function fetchAccount(accountName) {
  return dispatch => {
    dispatch(requestAccount(accountName))
    return fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': accountName})
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAccount(accountName, json)))
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
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
  const aggregations = state.aggregations
  if (aggregations.items.length === 0) {
    return true
  } else if (aggregations.isFetching) {
    return false
  } else {
    return aggregations.didInvalidate
  }  
}

export function fetchAggregationsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAggregations(getState())) {
      return dispatch(fetchAggregations())
    }
  }
}

export function fetchAccountIfNeeded(accountName) {
  return (dispatch, getState) => {
    return dispatch(fetchAccount(accountName))
    /*if (shouldFetchAggregations(getState())) {
      
    }
    */
  }
}