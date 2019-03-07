import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken';
export const REGISTER_USER = "REGISTER_USER"
export const CACTH_ERRORS = "CACTH_ERRORS"
export const LOGIN_USER = "LOGIN_USER"
export const SET_CURRENT_USER = "SET_CURRENT_USER"

export const registerUser = (userData, history) => dispatch => {

    axios.post('/api/users/register', userData)
        .then((res)=> history.push('/login'))
        .catch((err)=> dispatch({
            type : CACTH_ERRORS,
            payload : err.response.data 
        }))
    return {
        type : REGISTER_USER,
        payload : userData
    }
}

//************LOGIN USER***********///

export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}

export const loginUser = (userData, history) => dispatch => {

    axios.post('/api/users/login', userData)
        .then((res)=>{
            //Save token to local Storage
            const token = res.data.token
            localStorage.setItem('jwtToken', token)

            //Set token to Auth Header
            setAuthToken(token)
            //Decode token to get user data
            const decoded = jwt_decode(token)
            //Set the current user
            dispatch(setCurrentUser(decoded))
        })
        .catch((err)=> dispatch({
        type : CACTH_ERRORS,
        payload : err.response.data 
    }))
    return {
        type : LOGIN_USER,
        payload : userData
    }
}
export const logoutUser = () => dispatch => {
    //Remove token from localStorage
    localStorage.removeItem('jwtToken');
    //Remove auth Header for future requests
    setAuthToken(false)
    //Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}