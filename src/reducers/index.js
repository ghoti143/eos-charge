import { combineReducers } from 'redux'
import { account } from './account'
import { aggregation } from './aggregation'

const rootReducer = combineReducers({
  aggregation,
  account
})

export default rootReducer