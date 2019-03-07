import { SET_CURRENT_USER } from "../actions/action";
import isEmpty from '../../utils/isEmpty'

const initialState = {
    isAuthenticated : false,
    users : {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case SET_CURRENT_USER:
            return {
                ...state,
                users : action.payload,
                //action.payload we get is a object with decoded user info
                //and now we wanna check to see that is not empty
                isAuthenticated : !isEmpty(action.payload)
            }

        default:
            return state
    }
}
export default authReducer