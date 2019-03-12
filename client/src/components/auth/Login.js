import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser, setCurrentUser,  fetchGoogleUser} from '../actions/action'
import './loginAndRegister.css'

class Login extends Component {

    state = {
        email : '',
        password : '',
        errors : {},
        isAuthenticated : this.props.auth.isAuthenticated
    }

    onChangeHandle = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }    
    componentDidMount(){
      this.props.fetchGoogleUser()
      if (this.props.auth.isAuthenticated || this.props.currentUser) {
        this.props.history.push('/dashboard')
      }
    }
    componentWillReceiveProps(nextProps){
      if (nextProps.auth.isAuthenticated ) {
        this.props.history.push('/dashboard')
      }
      if(nextProps.errors){
        this.setState({
          errors : nextProps.errors
        })
      }
      
    }
    onFormSubmit = e => {
        e.preventDefault()
        const newUser = {
            email : this.state.email,
            password : this.state.password,
        }
        this.props.loginUser(newUser)

        if ( this.state.isAuthenticated ) {
          this.props.history.push('/dashboard')
        }
    }


  render() {
    return (
      <div style={{background:'steelBlue ', width:"100%",height:'calc(100vh - 60px)',
                   display:'flex', justifyContent:'center', alignItems:'center'}}>

      <div className='leftLoginSide'>
      <div style={{background:'black',borderRadius:'5px', width:"400px",margin:'0 auto', 
                   display:"flex", justifyContent:'center', alignItems:'center', height:"50px"}}>
      <span style={{color:'white', marginRight:"10px"}}>Don't have an account? </span>
      <Link to='/register'> Sign up here </Link> 
      </div>
      </div>

      <div className='rightLoginSide'>
      <div style={{width:"90%", }}>
      <div style={{fontSize:"30px",display:"flex",justifyContent:"center", alignItems:"center", margin:' 0 auto'}}>
        Login <span style={{marginLeft:"10px", fontSize:"16px"}}> or </span>
        <a href="/auth/google" 
        style={{marginLeft:"10px", background:'dodgerBlue ', color:"white", borderRadius:"3px", display:"flex", 
                justifyContent:"center",alignItems:'center', height:"40px", margin:"20px"}}>
        <div style={{background:'white', width:"40px", height:'40px', borderRadius:" 3px  0 0  3px"}}>
          <img alt='' src='/assets/gFont.jpg' style={{width:"40px", height:'40px'}}/>
        </div>
        <span style={{padding:"10px", fontSize:"16px", fontWeight:"bold"}}>Sign in with Google</span>
        </a>
    
      </div>

        <form onSubmit={this.onFormSubmit} className="col s6" autoComplete="off" style={{margin:"20px"}}>

            <div className="input-field col s12" style={{width:'80%', margin:'0 auto'}}>
            <input style={{color:'white'}}
            id="email" type='text' className={this.state.errors.email ? 'invalid' : 'validate'}
            value={this.state.email} 
            name='email' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="email">Email</label>
            <span className="helper-text" data-error={this.state.errors.email && this.state.errors.email} >
            </span>
            </div>
                        
            
            <div className="input-field col s12 LAR" style={{width:'80%', margin:'0 auto'}}>
            <input style={{color:'white'}}
            id="password" type='password' className={this.state.errors.password ? 'invalid' : 'validate'}
            value={this.state.password} 
            name='password' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="password">Password</label>
            <span className="helper-text" data-error={this.state.errors.password && this.state.errors.password} >
            </span>
            </div>
            
            <button style={{background:"dodgerBlue", margin:'20px'}}
            className="btn waves-effect waves-light" 
            type="submit" name="action">Login
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
    loginUser,
    setCurrentUser,
    fetchGoogleUser
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        errors : state.errors,
        currentUser : state.currentUserGoogle
    }
}

export default connect(mapStateToProps, actions)(Login)
