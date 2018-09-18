import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import RepeatIcon from '@material-ui/icons/Repeat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import FlashIcon from '@material-ui/icons/FlashOn';
import CompareIcon from '@material-ui/icons/CompareArrows';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  paper: {
    maxWidth: 320
  }
})

class Action extends Component {
  render() {
    const {classes, action} = this.props

    return (
      <Paper className={classes.paper}>              
        <List>
          <ListItem>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
            <ListItemText primary="Account" secondary={action._id.acct} />
          </ListItem>
          <ListItem>
            <Avatar>
              <MessageIcon />
            </Avatar>
            <ListItemText primary="Name" secondary={action._id.name} />
          </ListItem>
          <ListItem>
            <Avatar>
              <FlashIcon />
            </Avatar>
            <ListItemText primary="Avg CPU" secondary={action.avg_cpu_us} />
          </ListItem>
          <ListItem>
            <Avatar>
              <CompareIcon />
            </Avatar>
            <ListItemText primary="Avg NET" secondary={action.avg_net_words} />
          </ListItem>
          <ListItem>
            <Avatar>
              <RepeatIcon />
            </Avatar>
            <ListItemText primary="How many actions" secondary={action.acct_num_actions} />
          </ListItem>
        </List>
      </Paper>
    )
  }
}

export default withStyles(styles)(Action)