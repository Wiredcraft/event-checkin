import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loading, error, clear, getData } from '../modules/app'

// Could do a functional component here instead
// (eg. `export const Example = ({ prop1, prop2 }) => (<jsx>)`)
export class Example extends Component {
  fetchData () {
    const { actions } = this.props
    actions.getData()
    .then(res => {
      console.log('component .then', res)
    })
    .catch(err => {
      console.error('component .catch', err)
    })
  }

  render () {
    // Get redux state via props
    const { loading, error, data, actions } = this.props

    return (
      <section style={{ padding: '0 40px' }}>
        <h2>Redux Example</h2>

        <h3>⚠️ Open DevTool with <kbd>ctrl</kbd> + <kbd>h</kbd> ⚠️</h3>

        <p>
          <span>loading: </span>
          <span><code>{JSON.stringify(loading)}</code></span>
        </p>

        <p>
          <span>error: </span>
          <span><code>{error}</code></span>
        </p>

        <p>
          <span>Dispatch</span>
          <button onClick={() => actions.loading(!loading)}><code>actions.loading({JSON.stringify(!loading)})</code></button>
        </p>

        <p>
          <span>Dispatch</span>
          <button onClick={() => actions.error('oh no it broke!')}><code>actions.error('oh no it broke!')</code></button>
        </p>

        <p>
          <span>Dispatch</span>
          <button onClick={() => actions.clear()}><code>actions.clear()</code></button>
        </p>

        <p>
          <span>data: </span>
          <pre><code>{JSON.stringify(data, null, 4)}</code></pre>
        </p>

        <p>
          <span>Dispatch</span>
          <button onClick={this.fetchData.bind(this)}><code>actions.getData()</code></button>
        </p>
      </section>
    )
  }
}

// Define the expected props
Example.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string, // can be null, no isRequired
  data: PropTypes.object
}

// Grab relevant redux state, and set it to our component's props
const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
    error: state.app.error,
    data: state.app.data
  }
}

// Wrap our redux actions in a dispatch
// (attach the actions, "pure functions", to the store)
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({loading, error, clear, getData}, dispatch)
  }

  /*
    This is also a valid approach, but I prefer organising them into an actions prop
  */
  // return {
  //   loadingAction: bindActionCreators(loading, dispatch),
  //   errorAction: bindActionCreators(loading, dispatch)
  // }
}

// connect the component to redux, with our mapping functions
export default connect(mapStateToProps, mapDispatchToProps)(Example)
