import todos from './todos'
import filter from './filter'
import {
	combineReducers
} from '..'

const todoApp = combineReducers({
  TodosStore: todos,
  FilterStore: filter
})

export default todoApp