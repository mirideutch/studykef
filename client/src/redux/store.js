import {createStore ,combineReducers} from 'redux'
import useReducer from './reducers/userReducer'
import lebelsReduser from './reducers/lebelsReduser'

const reducer = combineReducers({useReducer,lebelsReduser})

const store = createStore(reducer)
window.store = store
export default store