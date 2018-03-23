/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import withRoot from '../components/withRoot'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Checkin from './checkin'
import Settings from './settings'
import DevApi from './dev-api'
import DevMembers from './dev-members'
import DevFiddle from './dev-fiddle'

// Redux
import { Provider } from 'react-redux'
import store from '../utils/store'

// Should only include this in dev
// Look at the Root containers in the link below for an example
// https://github.com/Wiredcraft/sams-customer-support-ui/tree/master/src/containers
import DevTool from '../utils/DevTool'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Index extends Component {
  render () {
    const classes = this.props.classes
    return (
      <Provider store={store}>
        <Router>
          <div>

            <AppBar position='static' color='default'>
              <Toolbar>

                <object data='/img/logo-w.svg' type='image/svg+xml' height='20px' style={{marginRight: '10px'}}>wiredcraft</object>

                {/* <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton> */}

                <Typography type='title' className={classes.flex}>
                  Event-Checkin
                </Typography>

                {/* <Button color="contrast" href='/#/checkin'>Check-In</Button> */}

                <Button href='/#/settings'>Settings</Button>

              </Toolbar>
            </AppBar>

            <div className={this.props.classes.root}>
              <Route path='/checkin/:urlName/:eventId' component={Checkin} />
              <Route path='/settings' component={Settings} />
              <Route path='/dev/api' component={DevApi} />
              <Route path='/dev/members' component={DevMembers} />
              <Route path='/dev/fiddle' component={DevFiddle} />
            </div>

            <DevTool />
          </div>
        </Router>
      </Provider>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))
