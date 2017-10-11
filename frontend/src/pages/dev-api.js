import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

class Dev extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: null,
      eventId: null,
      eventName: null,
      rsvps: null
    }
  }

  componentDidMount() {
    let self = this
    fetch('/api/events').then(res => {
      return res.json()
    }).then(d => {
      console.log(d);
      self.setState({events: d, eventId: d[0].id, eventName: d[0].name})

      fetch(`/api/events/${d[0].group.urlname}/${d[0].id}/rsvps`).then(res => {
        return res.json()
      }).then(d2 => {
        console.log(d2);
          self.setState({rsvps: d2})
      })

    })
  }

  render() {
    return (
      <div>

        <Typography type="headline" component="h2">
          Events
        </Typography>
        <Typography component="pre">
          {JSON.stringify(this.state.events, '', '  ')}
        </Typography>

        <Typography type="headline" component="h2">
          RSVPS {this.state.eventName} <code>id: {this.state.eventId}</code>
        </Typography>
        <Typography component="pre">
          {JSON.stringify(this.state.rsvps, '', '  ')}
        </Typography>

      </div>
    )
  }
}

export default Dev;
