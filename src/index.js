import React from 'react'
import {render} from 'react-dom'
import 'typeface-roboto'
import App from "./containers/App";
//import {configure} from 'mobx'

//configure({enforceActions: 'always'})

render(<App />, document.getElementById("root"))