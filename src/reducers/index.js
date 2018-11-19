import { combineReducers } from 'redux'

// reducers
import accountReducer from './account-reducer'

// combine
const reducers = combineReducers({
    accountReducer,

})
export default reducers;