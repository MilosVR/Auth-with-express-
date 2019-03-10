import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'
import { BrowserRouter, Route } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import test from './test';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/test' component={test}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
