import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        //If token exist apply to every request 
        axios.defaults.headers.common["Authorization"] = token
    }else{
        //If token doesn't exist delete token from auth header
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken