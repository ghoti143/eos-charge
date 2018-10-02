import React, {Component} from 'react'
import Action from '../components/Action'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import SearchInput from './SearchInput'
import InputLabel from '@material-ui/core/InputLabel'
import {inject, observer} from 'mobx-react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
})

class AllActions extends Component {
  componentDidMount() {
    this.props.actionStore.loadActions()    
  }

  componentWillReact() {
    console.log("AllActions will rerender")
  }

  handleFilterChange = value => {
    this.props.actionStore.setFilter(value)
  }

  handleBack = foo => {
    this.props.actionStore.prevPage()
  }

  handleNext = foo => {
    this.props.actionStore.nextPage()
  }

  render() {
    const {actionStore, acctStore, classes} = this.props
    
    return (
      <React.Fragment>
        <FormControl margin="none" required fullWidth>
          <InputLabel htmlFor="filter">Filter</InputLabel>
          <SearchInput id="filter" 
                  value={actionStore.filter}
                  placeholder="search by account name or action name"
                  onChange={this.handleFilterChange} />
        </FormControl>

        {actionStore.isLoaded &&
          <div><Grid container spacing={16}>
            {actionStore.pagedSortedList.map((action, i) => (
              <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                <Action action={action} availCpu={acctStore.account.cpu_limit.available} />
              </Grid>
            ))}
          </Grid>
          <div className={classes.buttons}>
            Showing actions {actionStore.startIdx + 1} - {actionStore.startIdx + actionStore.pageSize} of {actionStore.sortedList.length}

            {actionStore.startIdx !== 0 && (
              <Button onClick={this.handleBack} className={classes.button}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={classes.button}>
              Next
            </Button>
          </div></div>
        }
      </React.Fragment>
    )
  }
}

export default inject('actionStore', 'acctStore')(withStyles(styles)(observer(AllActions)))