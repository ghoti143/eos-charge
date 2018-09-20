import React, {Component} from 'react'
import Action from '../components/Action'
import Grid from '@material-ui/core/Grid';
import {inject, observer} from 'mobx-react'

class AllActions extends Component {
  componentDidMount() {
    this.props.store.loadAggregations()    
  }

  componentWillReact() {
    console.log("AllActions will rerender")
  }

  render() {
    const {store} = this.props
    
    return (
      <React.Fragment>
        {store.isLoaded &&
          <Grid container spacing={16}>
            {store.sortedList.map((action, i) => (
              <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                <Action action={action} />
              </Grid>
            ))}
          </Grid>
        }
      </React.Fragment>
    )
  }
}

export default inject('store')(observer(AllActions))