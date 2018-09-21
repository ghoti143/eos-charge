import React, {Component} from 'react'
import Action from '../components/Action'
import Grid from '@material-ui/core/Grid';
import {inject, observer} from 'mobx-react'

class AllActions extends Component {
  componentDidMount() {
    this.props.actionStore.loadActions()    
  }

  componentWillReact() {
    console.log("AllActions will rerender")
  }

  render() {
    const {actionStore, acctStore} = this.props
    
    return (
      <React.Fragment>
        {actionStore.isLoaded &&
          <Grid container spacing={16}>
            {actionStore.sortedList.map((action, i) => (
              <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                <Action action={action} availCpu={acctStore.account.cpu_limit.available} />
              </Grid>
            ))}
          </Grid>
        }
      </React.Fragment>
    )
  }
}

export default inject('actionStore', 'acctStore')(observer(AllActions))