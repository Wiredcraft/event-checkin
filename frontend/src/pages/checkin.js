import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  })
});

class Checkin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rsvps: [],
      filteredNames: [],
      checkedIn: {}
    }
    this.filterList = this.filterList.bind(this)
  }

  componentDidMount() {
    // console.log('urlName', this.props.match.params.urlName);
    // console.log('eventId', this.props.match.params.eventId);

    let self = this
    fetch(`/api/events/${this.props.match.params.urlName}/${this.props.match.params.eventId}/rsvps`).then(res => {
      return res.json()
    }).then(d => {
      let tmpCheckedIn = {}
      for (var i = 0; i < d.length; i++) {
        tmpCheckedIn[d[i].member.id] = false
      }
      // console.log('tmpCheckedIn', tmpCheckedIn)
      self.setState({rsvps: d, filteredNames: d, checkedIn: tmpCheckedIn})
    })
  }

  filterList(event){
    var updatedList = this.state.rsvps;
    updatedList = updatedList.filter(function(item){
      // console.log(item);
      return item.member.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    // console.log('filterList', event.target.value, updatedList);
    this.setState({filteredNames: updatedList});
  }

  render() {
    const classes = this.props.classes;
    let self = this
    console.log('RENDER', this.state);
    var list = (
      <List>
      {
        this.state.filteredNames.map(function(item, i) {
          // console.log('-->', item);
          // console.log(self.state.rsvps[i].member.id);

          let avatarURL = '/img/avatar.png'
          if (item.member.photo) {
            avatarURL = item.member.photo.photo_link
          }

          let guests = ''
          if (item.guests !== 0) {
            guests = '+'+item.guests
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
              <Avatar alt={item.member.name} src={avatarURL} style={{width: 64, height: 64}}/>
              <ListItemText primary={item.member.name} />
              <ListItemText primary={role} />
              <ListItemText primary={item.response}/>
              <ListItemText primary={guests} />

              <ListItemSecondaryAction>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={self.state.checkedIn[item.member.id]}
                        onChange={(event, checked) => {
                            console.log('check', item.member.id, checked);

                            // send checkin data to the API
                            // fetch(`/api/checkin`).then(res => {
                            //   return res.json()
                            // }).then(d => {
                            //   console.log('checkin response', d);
                            // })

                            let tmp = self.state.checkedIn
                            tmp[item.member.id] = checked

                            self.setState({ checkedIn: tmp })
                          }
                        }
                      />
                    }
                    label="Checkin"
                  />
                </FormGroup>
              </ListItemSecondaryAction>

            </ListItem>
          )

        })
       }
      </List>
    )

    let checkedInCounter = 0
    for (var i in this.state.checkedIn) {
      if (this.state.checkedIn.hasOwnProperty(i)) {
        console.log(this.state.checkedIn[i]);
        if (this.state.checkedIn[i] === true) {
          checkedInCounter++
        }
      }
    }
    return (
      <Grid container spacing={24} justify='center'>
        <Grid item xs={11} >
          <Paper className={classes.root} elevation={4}>

            <Typography type="headline" component="h2" style={{float: 'right'}}>
              Total Checked In: {checkedInCounter}
            </Typography>

            <Input
              placeholder="search meetup.com member here..."
              className={classes.input}
              fullWidth
              onChange={this.filterList}
            />
            {list}

          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Checkin)
