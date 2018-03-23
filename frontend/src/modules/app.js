import createReducer from '../utils/createReducer'

// CONSTANTS
const LOADING = 'app_LOADING'
const ERROR = 'app_ERROR'
const CLEAR = 'app_CLEAR'

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

// DEFAULT STATE
const initialState = {
  loading: false,
  error: null
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
  }
}

export default createReducer(initialState, actionHandlers)
