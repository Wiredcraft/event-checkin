import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import logger from '../logger'
import DevTool from '../DevTool'

import reducers from '../../modules'

const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  DevTool.instrument()
)(createStore)

const combinedReducers = combineReducers(reducers)

const store = finalCreateStore(combinedReducers)

export default store
