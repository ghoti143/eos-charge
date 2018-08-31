export const CHANGE_ACCOUNT_NAME = 'CHANGE_ACCOUNT_NAME'
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT'
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'

export function changeAccountName(name) {
  return {
    type: CHANGE_ACCOUNT_NAME,
    name
  }
}

function requestAccount(name) {
  return {
    type: REQUEST_ACCOUNT,
    name
  }
}

function receiveAccount(name, json) {
  return {
    type: RECEIVE_ACCOUNT,
    name,
    account: json,
    receivedAt: Date.now()
  }
}

function fetchAccount(name) {
  return dispatch => {
    dispatch(requestAccount(name))
    return fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': name})
    })
      .then(response => response.json())
      .then(json => dispatch(receiveAccount(name, json)))
  }
}

export function fetchAccountIfNeeded(name) {
  return (dispatch) => {
    return dispatch(fetchAccount(name))
  }
}