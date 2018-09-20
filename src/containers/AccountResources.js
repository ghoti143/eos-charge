import React, {Component} from 'react'
import Battery from '../components/Battery'
import {inject, observer} from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  batteryRoot: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  }
})

class AccountResources extends Component {
  componentWillReact() {
    console.log("AccountResources will rerender")
  }

  render() {
    const {store} = this.props
    const {classes} = this.props

    return (
      <React.Fragment>
        {store.account &&
          <Grid container className={classes.batteryRoot}>
            <Grid item xs={6}>
              <Battery type="net" resource={store.account.net_limit} />
            </Grid>
            <Grid item xs={6}>
              <Battery type="cpu" resource={store.account.cpu_limit} />
            </Grid>
          </Grid>}
      </React.Fragment>          
    )
  }
}

export default inject('store')(withStyles(styles)(observer(AccountResources)))