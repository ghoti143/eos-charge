import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

render(
  <Root />,
  document.getElementById('root')
)

/*
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
*/