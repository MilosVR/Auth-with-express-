import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../actions/action'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Register extends Component {

    state = {
        name : '',
        email : '',
        password : '',
        password2 : '',
        errors : {}
    }
    componentDidMount(){
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard')
        }
      }
    onChangeHandle = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }    

    onFormSubmit = e => {
        e.preventDefault()
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }
        this.props.registerUser(newUser, this.props.history)
        this.setState({
            newUser: {
                name : '',
                email : '',
                password : '',
                password2 : ''
            },
        })
    }

  render() {
    return (
        <div style={{background:'steelBlue ', width:"100%",height:'calc(100vh - 60px)',
                   display:'flex', justifyContent:'center', alignItems:'center'}}>

      <div className='leftLoginSide' style={{background:'url(/assets/registerGif.gif) center center'}}>
      <div style={{background:'black',borderRadius:'5px', width:"400px",margin:'0 auto', 
                   display:"flex", justifyContent:'center', alignItems:'center', height:"50px"}}>
      <span style={{color:'white', marginRight:"10px"}}>Already have an account? </span>
      <Link to='/login'> Sign in </Link> 
      </div>
      </div>

      <div className='rightLoginSide'>
      <div style={{width:"90%", }}>
      <div style={{fontSize:"30px",display:"flex",justifyContent:"center", alignItems:"center", margin:' 0 auto'}}>
        Register 
        
    
      </div>

        <form onSubmit={this.onFormSubmit} className="col s6" autoComplete="off">

        <div className="input-field col s12 ">
            <input style={{color:'white'}}
            id="name" type='text' className={this.props.errors.name ? 'invalid' : 'validate'}
            value={this.state.name} 
            name='name' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="name">Name</label>
            <span className="helper-text" data-error={this.props.errors.name} data-success='Work'>
            </span>
        </div>

        <div className="input-field col s12 ">
            <input style={{color:'white'}}
            id="email" type='text' className={this.props.errors.email ? 'invalid' : 'validate'}
            value={this.state.email} 
            name='email' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="email">Email</label>
            <span className="helper-text" data-error={this.props.errors.email && this.props.errors.email} >
            </span>
        </div>

        <div className="input-field col s12 ">
            <input style={{color:'white'}}
            id="password" type='text' className={this.props.errors.password ? 'invalid' : 'validate'}
            value={this.state.password} 
            name='password' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="password">Password</label>
            <span className="helper-text" data-error={this.props.errors.password && this.props.errors.password} >
            </span>
        </div>

        <div className="input-field col s12 ">
            <input style={{color:'white'}}
            id="password2" type='text' className={this.props.errors.password2 ? 'invalid' : 'validate'}
            value={this.state.password2} 
            name='password2' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="password2">Confirm Password</label>
            <span className="helper-text" data-error={this.props.errors.password2 && this.props.errors.password2} >
            </span>
        </div>

        <button style={{background:"dodgerBlue"}}
            className="btn waves-effect waves-light" 
            type="submit" name="action">
              Register
              <i className="material-icons right">send</i>
            </button>

        </form>

    </div>
      </div>
      </div>
    )
  }
}

const actions = {
    registerUser,
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        errors : state.errors
    }
}

export default connect(mapStateToProps, actions)(withRouter(Register))