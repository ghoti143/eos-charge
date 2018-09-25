import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Utils from './Utils'

const styles = {
  card: {
    //minWidth: 250,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'scale-down',
  },
}

class PopularAction extends Component {

  createMarkup(action, availCpu) {
    const count = Utils.computeCount(availCpu, action.avg_cpu_us)
    const cpu = Utils.formatQuantity(availCpu, 'cpu')

    const html = action.description.replace('$AVAIL_CPU', cpu).replace('$COUNT', count)
    return {__html: html};
  }

  render() {
    const {classes, action, availCpu} = this.props
    
    return (
      <Card className={classes.card}>
        <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={`./images/${action.img}`}
          title={action.title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {action.title}
          </Typography>
          <Typography component="p" dangerouslySetInnerHTML={this.createMarkup(action, availCpu)}>
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    )
  }
}

export default withStyles(styles)(PopularAction)