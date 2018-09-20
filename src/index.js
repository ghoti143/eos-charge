import React from 'react'
import {render} from 'react-dom'
import 'typeface-roboto'
import App from "./containers/App";
//import {configure} from 'mobx'

//configure({enforceActions: 'always'})

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

render(<App />, document.getElementById("root"))