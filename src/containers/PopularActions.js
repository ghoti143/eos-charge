import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid';
import PopularAction from '../components/PopularAction'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit
  }
})

class PopularActions extends Component {
  componentWillReact() {
    console.log("PopularActions will rerender")
  }

  render() {
    const {classes, actionStore, acctStore} = this.props

    return (
      <React.Fragment>
        {actionStore.isLoaded &&
          <Grid container spacing={16} className={classes.container}>
          {actionStore.popularActions.map((action, i) => (
            <Grid key={i} item xs={12} sm={4} md={6} lg={4}>
              <PopularAction action={action} availCpu={acctStore.account.cpu_limit.available} />
            </Grid>
          ))}
          </Grid>
        }
      </React.Fragment>
    )
  }
}

export default inject('actionStore', 'acctStore')(withStyles(styles)(observer(PopularActions)))