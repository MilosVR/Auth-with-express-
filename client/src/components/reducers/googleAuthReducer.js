import { FETCH_GOOGLE_USER, LOGIN_GOOGLE_USER, LOGOUT_GOOGLE_USER } from "../actions/action";



const googleAuthReducer = ( state=null, action ) => {
    switch (action.type) {

        case FETCH_GOOGLE_USER:
            return action.payload || false

        case LOGIN_GOOGLE_USER:
            return action.payload   

        case LOGOUT_GOOGLE_USER:
            return false
            
        default:
            return state
    }
}

export default googleAuthReducer