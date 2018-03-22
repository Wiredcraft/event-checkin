import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Input from 'material-ui/Input'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { stringNormalizer } from '../utils'

import CheckinToggle from '../components/checkinToggle'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
})

class Checkin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      meetup: {},
      rsvps: [],
      filteredNames: [],
      checkedIn: {}
    }
    this.filterList = this.filterList.bind(this)
    this.updateToggleState = this.updateToggleState.bind(this)
  }

  componentDidMount () {
    let self = this

    // console.log('urlName', this.props.match.params.urlName);
    // console.log('eventId', this.props.match.params.eventId);

    fetch(`/api/events/${this.props.match.params.urlName}/${this.props.match.params.eventId}`).then(res => {
      return res.json()
    }).then(data => {
      console.log(data);

      // get the rsvps of the meetup event
      fetch(`/api/events/${this.props.match.params.urlName}/${this.props.match.params.eventId}/rsvps`).then(res => {
        return res.json()
      }).then(d => {
        let tmpCheckedIn = {}
        for (var i = 0; i < d.length; i++) {
          tmpCheckedIn[d[i].member.id] = false
        }

        // get the already checked in person
        const filter = encodeURIComponent(JSON.stringify({
          where: {
            urlName: this.props.match.params.urlName,
            eventId: this.props.match.params.eventId
          }
        }))
        fetch(`/api/Checkins?filter=${filter}`).then(res => {
          return res.json()
        }).then(d2 => {
          // console.log('DATA', d);
          for (var i = 0; i < d2.length; i++) {
            let memberId = parseInt(d2[i].memberId)
            // console.log('-->', memberId, [i])
            tmpCheckedIn[memberId] = true
          }

          // console.log('tmpCheckedIn', tmpCheckedIn)
          self.setState({meetup: data, rsvps: d, filteredNames: d, checkedIn: tmpCheckedIn})
        })
      })
    })
  }
  updateToggleState (toggleState) {
    this.setState(toggleState)
  }
  filterList (event) {
    var updatedList = this.state.rsvps
    updatedList = updatedList.filter(function (item) {
      // console.log(item);
      return stringNormalizer(item.member.name).search(
        stringNormalizer(event.target.value)) !== -1
    })
    // console.log('filterList', event.target.value, updatedList);
    this.setState({filteredNames: updatedList})
  }

  render () {
    const classes = this.props.classes
    let self = this
    // console.log('RENDER', this.state)
    var list = (
      <Table>
        <TableBody>
          {
        this.state.filteredNames.map(function (item, i) {
          // console.log('-->', item);
          // console.log(self.state.rsvps[i].member.id);

          let avatarURL = '/img/avatar.png'
          if (item.member.photo) {
            avatarURL = item.member.photo.photo_link
          }

          let guests = ''
          if (item.guests !== 0) {
            guests = '+' + item.guests
          }

          let role = ''
          if (item.member.role) {
            role = item.member.role
          }

          // if the response is 'no', the member will not come to the meetup.
          if (item.response === 'no') {
            return ' '
          }

          return (
            <TableRow key={i}>

              <TableCell style={{padding: '0'}}>
                <Avatar alt={item.member.name} src={avatarURL} style={{width: 64, height: 64}} />
              </TableCell>

              <TableCell style={{padding: '0'}}>
                {item.member.name}
              </TableCell>

              <TableCell>
                {role}
              </TableCell>

              <TableCell>
                {item.response}
              </TableCell>

              <TableCell>
                {guests}
              </TableCell>

              <TableCell>
                <CheckinToggle
                  checkinState={self.state.checkedIn}
                  checked={self.state.checkedIn[item.member.id]}
                  memberId={item.member.id}
                  urlName={self.props.match.params.urlName}
                  eventId={self.props.match.params.eventId}
                  updateToggleState={self.updateToggleState}
                />
              </TableCell>

            </TableRow>
          )
        })
       }
        </TableBody>
      </Table>
    )

    let checkedInCounter = 0
    for (var i in this.state.checkedIn) {
      if (this.state.checkedIn.hasOwnProperty(i)) {
        // console.log(this.state.checkedIn[i]);
        if (this.state.checkedIn[i] === true) {
          checkedInCounter++
        }
      }
    }
    return (
      <Grid container spacing={24} justify='center'>
        <Grid item xs={11} >

          <Typography type='headline' component='h2'>
            {this.state.meetup.name}
            <span style={{float: 'right'}}>
              RSVPs: {this.state.meetup.yes_rsvp_count} Waitlist: {this.state.meetup.waitlist_count}
            </span>
          </Typography>

          <Paper className={classes.root} elevation={4}>

            <Typography type='headline' style={{float: 'right'}}>
              Total Checked In: {checkedInCounter}
            </Typography>

            <Input
              placeholder='search meetup.com member here...'
              className={classes.input}
              fullWidth
              onChange={this.filterList}
              style={{marginBottom: '2em'}}
            />

            {list}

          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Checkin)
