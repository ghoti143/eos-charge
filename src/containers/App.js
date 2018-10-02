import React, {Component} from 'react'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Account from './Account'
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import ActionStore from "../stores/ActionStore"
import AccountStore from "../stores/AccountStore"
import PopularActions from './PopularActions'
import AllActions from './AllActions'
import {inject, observer, Provider} from 'mobx-react'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
    textAlign: 'center'
  },
  footerLogo: {
    height: 60,
    width: 60,
    marginBottom: theme.spacing.unit * 2
  },
})

class App extends Component {
  componentDidMount() {
    this.props.actionStore.loadActions()    
  }

  render() {
    const {classes} = this.props
    
    return (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <OfflineBoltIcon className={classes.icon} />
          <Typography variant="title" color="inherit" noWrap>
            EOS Charge
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
              Check Your Charge
            </Typography>
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              Enter your EOS Address below to recieve a custom report of how many actions you can perform on the EOS Mainnet.
            </Typography>
            <div className={classes.heroButtons}>
              <Account />              
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Provider actionStore={ActionStore} acctStore={AccountStore}>
            <PopularActions />
          </Provider>
          <Provider actionStore={ActionStore} acctStore={AccountStore}>
            <AllActions />
          </Provider>
          
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer} aligh="center">
        <img className={classes.footerLogo} src="./images/EOS-NY_logo.svg" align="center" alt="EOS New York logo" />
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Made with <span role="img" aria-label="heart" aria-labelledby="heart">❤️</span> by <a href="https://www.eosnewyork.io/">EOS New York</a>
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
    )
  }
}

export default inject('actionStore', 'acctStore')(withStyles(styles)(observer(App)))