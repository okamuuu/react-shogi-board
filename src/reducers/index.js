import { combineReducers } from 'redux'
import board from './board'
import hands from './hands'
import color from './color'

export default combineReducers({
  board,
  hands,
  color
})
