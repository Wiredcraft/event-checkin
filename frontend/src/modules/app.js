/* global fetch */
import createReducer from '../utils/createReducer'

// CONSTANTS
const LOADING = 'app_LOADING'
const ERROR = 'app_ERROR'
const CLEAR = 'app_CLEAR'
const DATA = 'app_DATA'

// ACTIONS
export const loading = status => {
  return { type: LOADING, payload: status }
}

export const error = error => {
  return { type: ERROR, payload: error }
}

export const clear = () => {
  return { type: CLEAR }
}

export const getData = () => (dispatch, getState) => {
  // If there is an error now, clear it
  const hasError = getState().app.error
  if (hasError) dispatch(error(null))

  return fetch(`https://api.jsonbin.io/b/5ab4e5af2efae41465ebadc0`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      // Dispatch data directly
      dispatch({ type: DATA, payload: res })
      return res
    })
    .catch(err => {
      // Dispatch defined function
      dispatch(error(err.message))
      throw err
    })
}

// DEFAULT STATE
const initialState = {
  loading: false,
  error: null,
  data: null
}

// REDUCER
const actionHandlers = {
  [LOADING]: (state, action) => {
    return { ...state, loading: action.payload }
  },
  [ERROR]: (state, action) => {
    return { ...state, error: action.payload, member: null }
  },
  [CLEAR]: (state, action) => {
    return initialState
  },
  [DATA]: (state, action) => {
    return { ...state, data: action.payload }
  }
}

export default createReducer(initialState, actionHandlers)
