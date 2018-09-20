import React, {Component} from 'react'
import Battery from '../components/Battery'
import {inject, observer} from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const styles = theme => ({
  layout: {
    //marginRight: theme.spacing.unit * 2,
    //marginLeft: theme.spacing.unit / 2,
    width: 'auto',
    
    [theme.breakpoints.up('md')]: {
      //marginRight: 0
    },
    
    [theme.breakpoints.only('sm')]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonWrapper: {
    position: 'relative',
    marginLeft: theme.spacing.unit * 4

  },  
  buttonProgress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  form: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  formInputs: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  batteryRoot: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  }
})

class Account extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.store.loadAccount()
  }  

  handleChange = name => e => {
    this.props.store.setAccountName(e.target.value)
  }

  render() {
    const {store} = this.props
    const {classes} = this.props

    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={e => this.handleSubmit(e)}>
              <div className={classes.formInputs}>
                <FormControl margin="none" required fullWidth>
                  <InputLabel htmlFor="acct_name">EOS Account Name</InputLabel>
                  <Input id="acct_name" 
                        name="acct_name" 
                        placeholder="Ex: eosnewyorkio" 
                        value={store.accountName}
                        autoFocus 
                        onChange={this.handleChange('acctName')} />
                </FormControl>
                <div className={classes.buttonWrapper}>
                  <Button variant="fab" 
                          color="primary" 
                          type="submit" 
                          disabled={store.state === 'pending' || store.state === 'error'}>
                    {store.state === 'init' || store.state === 'pending' ? <SearchIcon /> :
                     store.state === 'error' ? <PriorityHighIcon /> :                     
                     <CheckIcon />}
                  </Button>
                  {store.state === 'pending' &&
                    <CircularProgress size={68} className={classes.buttonProgress} />}
                </div>
              </div>
              {store.state === 'error' && 
                  <FormLabel error="true">{store.error.message}</FormLabel>}
            </form>

            {store.account &&
              <Grid container className={classes.batteryRoot}>
                <Grid item xs={6}>
                  <Battery type="net" resource={store.account.net_limit} />
                </Grid>
                <Grid item xs={6}>
                  <Battery type="cpu" resource={store.account.cpu_limit} />
                </Grid>
              </Grid>}
          </Paper>
        </main>
      </div>
    )
  }
}

export default inject('store')(withStyles(styles)(observer(Account)))