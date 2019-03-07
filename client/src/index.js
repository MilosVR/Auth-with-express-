import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './components/reducers/rootReducer';
import jwt_decoded from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './components/actions/action'

const store = createStore(rootReducer, applyMiddleware(thunk))

if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //Decode token and get user info and expiration
  const decoded = jwt_decoded(localStorage.jwtToken)
  //set user and is authenticated
  //With store.dispatch we can calll every action 
  //and everything in our store
  store.dispatch(setCurrentUser(decoded))
}


ReactDOM.render(
<Provider store={store}><App /></Provider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
