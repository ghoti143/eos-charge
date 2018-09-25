import React, {Component} from 'react'
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Account from './Account'
import Button from '@material-ui/core/Button';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ActionStore from "../stores/ActionStore";
import AccountStore from "../stores/AccountStore";
import PopularActions from './PopularActions'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
  },
});

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
              {/*
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <FormControl margin="none" required fullWidth>
                  <InputLabel htmlFor="acct_name">EOS Account Name</InputLabel>
                  <Input id="acct_name" 
                          //value={store.accountName}
                          placeholder="Ex: eosnewyorkio" 
                          autoFocus 
                          //onChange={this.handleAcctNameChange} 
                          />
                </FormControl>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
              </Grid>
              */}
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Provider actionStore={ActionStore} acctStore={AccountStore}>
            <PopularActions />
          </Provider>
          
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
    )
  }
}

export default inject('actionStore', 'acctStore')(withStyles(styles)(observer(App)))