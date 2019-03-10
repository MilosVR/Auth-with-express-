import { combineReducers } from 'redux'
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import  googleAuthReducer  from './googleAuthReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    errors : errorReducer,
    currentUserGoogle : googleAuthReducer
})

export default rootReducer