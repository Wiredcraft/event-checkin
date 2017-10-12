import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
})

class Dev extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    console.log('didMount')
  }

  render () {
    const { classes } = this.props
    return (
      <Grid container spacing={24} justify='center'>
        <Grid item xs={11} >
          <Paper className={classes.root} elevation={4}>
            <Typography type='headline' component='h3'>
              Fiddle
            </Typography>
            <Typography type='body1' component='p'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dev)
