import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Grid from '@material-ui/core/Grid';
import PopularAction from '../components/PopularAction'

class PopularActions extends Component {
  componentWillReact() {
    console.log("PopularActions will rerender")
  }

  render() {
    const {actionStore, acctStore} = this.props

    return (
      <Grid container spacing={40}>            
        {actionStore.popularActions.map((action, i) => (
          <Grid item key={action.uniqueId} sm={6} md={4} lg={3}>
            <PopularAction action={action} availCpu={acctStore.account.cpu_limit.available} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default inject('actionStore', 'acctStore')(observer(PopularActions))