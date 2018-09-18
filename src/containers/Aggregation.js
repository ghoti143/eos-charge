import React, {Component} from 'react'
import Action from '../components/Action'
import Grid from '@material-ui/core/Grid';
import {inject, observer} from 'mobx-react'

class Aggregation extends Component {
  componentDidMount() {
    this.props.store.loadAggregations()    
  }

  render() {
    const {store} = this.props
    
    return (
      <React.Fragment>
        {store.aggregations.length > 0 &&
          <Grid container>
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

export default inject('store')(observer(Aggregation))