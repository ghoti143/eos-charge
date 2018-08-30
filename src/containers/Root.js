import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
//import AsyncApp from './AsyncApp'
import AsyncApp1 from './AsyncApp1'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp1 />
      </Provider>
    )
  }
}