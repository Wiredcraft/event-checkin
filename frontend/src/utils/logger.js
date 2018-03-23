import moment from 'moment'

export default function logger (store) {
  return next => action => {
    console.groupCollapsed('Logger', action.type, moment().format('HH:mm:ss (DD/MM/YY)')) // Collapsed by default
    // console.group('Logger', moment().format('HH:mm:ss (DD/MM/YY)') // Open by default
    console.log('before', store.getState())
    console.log('action', action)
    const result = next(action)
    console.log('after', store.getState())
    console.groupEnd()
    return result
  }
}
