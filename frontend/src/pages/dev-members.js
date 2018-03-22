import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Avatar from 'material-ui/Avatar'
import stringNormalizer from '../utils'

class Dev extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: null,
      eventId: null,
      eventName: null,
      rsvps: null
    }
  }

  componentDidMount () {
    let self = this
    fetch('/api/events').then(res => {
      return res.json()
    }).then(d => {
      // console.log(d);
      self.setState({events: d, eventId: d[0].id, eventName: d[0].name})

      fetch(`/api/events/${d[0].group.urlname}/${d[0].id}/rsvps`).then(res => {
        return res.json()
      }).then(d2 => {
        // console.log(d2);
        self.setState({rsvps: d2})
      })
    })
  }

  render () {
    let list
    if (this.state.rsvps !== null) {
      list = this.state.rsvps.map((item, i) => {
        // console.log(item, i);

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
          return ''
        }

        return (
          <ListItem key={i}>
            <Avatar alt={item.member.name} src={avatarURL} style={{width: 64, height: 64}} />
            <ListItemText primary={item.member.name + ' id: ' + item.member.id} />
            <ListItemText primary={guests} />
            <ListItemText primary={role} />
            <ListItemText primary={item.response} />
            <ListItemSecondaryAction>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.checkedA}
                      onChange={(event, checked) => this.setState({ checkedA: checked })}
                    />
                  }
                  label='Check-In'
                />
              </FormGroup>

            </ListItemSecondaryAction>
          </ListItem>
        )
      })
    }

    return (
      <div>

        <Typography type='headline' component='h2'>
          RSVPS {this.state.eventName} <code>id: {this.state.eventId}</code>
        </Typography>

        {/*
        <Typography component="pre">
          {JSON.stringify(this.state.rsvps, '', '  ')}
        </Typography>
        */}

        <List>
          {list}
        </List>

      </div>
    )
  }
}

export default Dev
