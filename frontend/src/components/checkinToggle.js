// Toggle button for the guest checkin

//TODO: Fetch list of checked in users in Checkin component and pass them as prop to this component and check if the current user is checked in to determine toggle state.

import React, { Component } from 'react'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import Switch from 'material-ui/Switch'


class CheckinToggle extends Component {

  constructor (props) {
    super(props)
    this.state = {
      checkinId: null
    }
  }
  componentDidMount(){
    //todo
  }
  componentDidUpdate(){
    //todo  
  }
  render(){
    const { checkinState, checked, memberId, urlName, eventId, updateToggleState } = this.props

    //TODO: Comments
    return(
      <FormGroup>
      <FormControlLabel
        label='Checkin'
        control= {
          <Switch
            checked={checked}
            onChange={(event, checked) => {
              let postOpt = {}
              console.log('check', memberId, checked)
              let postBody = JSON.stringify({
                date: new Date(),
                urlName: urlName,
                eventId: eventId,
                memberId: memberId + ''
              })
              if(checked){
                console.log('postBody', postBody)
                postOpt = {
                  method: 'post',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: postBody
                }
                fetch(`/api/checkins`, postOpt).then(res => {
                  return res.json()
                }).then(d => {
                console.log('checkin response', d)
                this.setState({checkinId: d.id})
              })
              }else{
                console.log(this.state.checkinId)
                 fetch(`/api/checkins/` + this.state.checkinId, {
                  method: 'delete'
                }).then(d => {
                console.log('checkin response', d)
                this.setState({checkinId: null})
              })
              }
              // send checkin data to the API

              let tmp = checkinState
              tmp[memberId] = checked

              updateToggleState({ checkedIn: tmp })
            }
          }
          />
        }
      />
     </FormGroup>
    )
  }
}

export default CheckinToggle
