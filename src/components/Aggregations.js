import React, { Component } from 'react'
import './Aggregations.css'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import RepeatIcon from '@material-ui/icons/Repeat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import FlashIcon from '@material-ui/icons/FlashOn';
import CompareIcon from '@material-ui/icons/CompareArrows';

const styles = {
  card: {
    maxWidth: 345,
    float: 'left'
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

class Aggregations extends Component {
  render() {
    const {classes} = this.props
    return (
      
      <div id="actions">
        {this.props.aggregations.map((agg, i) => (
          <Card key={i} className={classes.card}>
            <CardContent>
              <List>
                <ListItem>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                  <ListItemText primary="Account" secondary={agg._id.acct} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <MessageIcon />
                  </Avatar>
                  <ListItemText primary="Name" secondary={agg._id.name} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <FlashIcon />
                  </Avatar>
                  <ListItemText primary="Avg CPU" secondary={agg.avg_cpu_us} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <CompareIcon />
                  </Avatar>
                  <ListItemText primary="Avg NET" secondary={agg.avg_net_words} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <RepeatIcon />
                  </Avatar>
                  <ListItemText primary="How many actions" secondary={agg.acct_num_actions} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(Aggregations)