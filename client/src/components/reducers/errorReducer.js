import { CACTH_ERRORS } from "../actions/action";


const initialState = {}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
    
        case CACTH_ERRORS:
            return  action.payload

        default:
            return state
    }
}
export default errorReducer