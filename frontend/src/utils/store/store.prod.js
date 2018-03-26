import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import reducers from '../../modules'

const finalCreateStore = applyMiddleware(thunk)(createStore)

const combinedReducers = combineReducers(reducers)

const store = finalCreateStore(combinedReducers)

export default store
