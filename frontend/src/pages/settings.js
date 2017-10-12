import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemText, ListItemSecondaryAction} from 'material-ui/List'
import red from 'material-ui/colors/red'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import Chip from 'material-ui/Chip'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),

  icon: {
    fill: red[500]
  }
})

class Settings extends Component {
  constructor () {
    super()
    this.state = {
      meetupEvents: [],
      people: []
    }
  }

  componentDidMount () {
    let self = this
    fetch('/api/events').then(res => {
      return res.json()
    }).then(d => {
      console.log(d)
      self.setState({meetupEvents: d})
    })

    fetch('/api/people').then(res => {
      return res.json()
    }).then(d => {
      // console.log(d);
      self.setState({people: d})
    })
  }

  render () {
    let meetupsList = this.state.meetupEvents.map((item, i) => {
      console.log(item)
      return (
        <ListItem button key={item.id} onClick={(e) => { console.log('CLICK', e.target); window.location.href = '/#/checkin/' + item.group.urlname + '/' + item.id }}>
          <ListItemText primary={item.name} />
          <Chip
            label={"RSVP's: " + item.yes_rsvp_count}
            className={this.props.classes.chip}
          />
          <Chip
            label={'Waitinglist: ' + item.waitlist_count}
            className={this.props.classes.chip}
          />
        </ListItem>
      )
    })

    let speakersList = this.state.people.map((item, i) => {
      return (
        <ListItem button key={item.id}>

          <ListItemText primary={item.name} />

          <ListItemSecondaryAction>
            <IconButton aria-label='Comments' value={item.id} onClick={(e) => { console.log('delete', e.target.value) }}>
              <DeleteIcon className={this.props.classes.icon} />
            </IconButton>
            <IconButton aria-label='Comments' value={item.id} onClick={(e) => { console.log('edit', e.target.value) }}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>
      )
    })

    const { classes } = this.props
    return (
      <Grid container spacing={24} justify='center'>

        <Grid item xs={10} >
          <Paper className={classes.root} elevation={4}>
            <Typography type='headline'>
              Settings
            </Typography>
            <Typography type='body1' component='p'>
              Here you can add the speaker and speaker-guestlist
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={10} >
          <Paper className={classes.root} elevation={4}>
            <Typography type='headline'>
              Meetups
            </Typography>
            <List className={classes.root}>
              {meetupsList}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={10} >
          <Paper className={classes.root} elevation={4}>
            <Typography type='headline'>
              Speakers
            </Typography>

            <Button raised color='primary' className={classes.button}>
              Add Speaker
            </Button>

            <List className={classes.root}>
              {speakersList}
            </List>

          </Paper>
        </Grid>

      </Grid>
    )
  }
}

export default withStyles(styles)(Settings)
