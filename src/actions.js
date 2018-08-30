import fetch from 'cross-fetch'

export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS'
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS'
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

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
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
    return fetch('https://www.eossnapshots.io/data/eoscharge/latest.json')
      .then(response => response.json())
      .then(json => dispatch(receiveAggregations(json)))
  }
}

function shouldFetchAggregations(state) {
  const aggregations = state.aggregations
  if (aggregations.isFetching) {
    return false
  } else {
    return true
  }  
}

export function fetchAggregationsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAggregations(getState())) {
      return dispatch(fetchAggregations())
    }
  }
}