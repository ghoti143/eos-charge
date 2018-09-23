import React, {Component} from 'react'
import Action from '../components/Action'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import SearchInput from './SearchInput';
import InputLabel from '@material-ui/core/InputLabel';
import {inject, observer} from 'mobx-react'

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


  render() {
    const {actionStore, acctStore} = this.props
    
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