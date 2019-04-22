import { combineReducers } from '../lib/duckx'
import todo from './todo'
import offer from './offer'


export default combineReducers({
  todo,
  offer,
})