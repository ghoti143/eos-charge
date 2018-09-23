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
import Utils from './Utils'
import ActionCount from './ActionCount'

const styles = theme => ({
  paper: {
    maxWidth: 320,
    overflow: 'hidden'
  }
})

class Action extends Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.action !== this.props.action || 
            nextProps.availCpu !== this.props.availCpu)
  }

  render() {
    const {classes, action, availCpu} = this.props
    const cpu = Utils.formatQuantity(action.avg_cpu_us, 'cpu')
    const net = Utils.formatQuantity(action.avg_net_words, 'words')
    
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
            <ListItemText primary="Avg CPU" secondary={cpu} />
          </ListItem>
          <ListItem>
            <Avatar>
              <CompareIcon />
            </Avatar>
            <ListItemText primary="Avg NET" secondary={net} />
          </ListItem>
          <ListItem>
            <Avatar>
              <RepeatIcon />
            </Avatar>
            <ActionCount availCpu={availCpu} avgCpu={action.avg_cpu_us} />
          </ListItem>
        </List>
      </Paper>
    )
  }
}

export default withStyles(styles)(Action)