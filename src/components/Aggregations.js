import React, { Component } from 'react'
import './Aggregations.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import RepeatIcon from '@material-ui/icons/Repeat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import FlashIcon from '@material-ui/icons/FlashOn';
import CompareIcon from '@material-ui/icons/CompareArrows';

export default class Aggregations extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        {this.props.aggregations.map((agg, i) => (
          <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
            <Paper className="action-card">              
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
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}