import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Resource from '../components/Resource'
import {
  fetchAccountIfNeeded,
  changeAccountName
} from '../actions/account'

class Account extends Component {
  constructor(props) {
    super(props)
    this.handleAccountNameSubmit = this.handleAccountNameSubmit.bind(this)
    this.updateInputValue = this.updateInputValue.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)    
  }

  handleAccountNameSubmit() {
    const { dispatch, name } = this.props
    dispatch(fetchAccountIfNeeded(name))
  }

  updateInputValue(e) {
    const { dispatch } = this.props
    dispatch(changeAccountName(e.target.value))
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleAccountNameSubmit()
    }
  }

  render() {
    const { name, data, lastUpdated } = this.props
    return (
      <div>
        <span>Account Name: </span>
        <input value={name} onChange={this.updateInputValue} onKeyPress={this.handleKeyPress} />
        <button onClick={this.handleAccountNameSubmit}>
          Submit
        </button>

        {lastUpdated > 0 &&
          <div>
            <Resource type="net" resource={data.net_limit} />
            <Resource type="cpu" resource={data.cpu_limit} />
          </div>
        }
      </div>
    )
  }
}

Account.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { account } = state
  const {
    name,
    data,
    lastUpdated
  } = account || {
    name: '',
    data: {}
  }

  return {
    name,
    data,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Account)