import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard')
      }
      this.props.fetchGoogleUser()
    }
    componentWillReceiveProps(nextProps){
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard')
      }
      //if(nextProps.errors){
        //this.setState({
          //errors : nextProps.errors
        //})
      //}
      
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
      <div style={{background:'url(/assets/loginBackground.jpg) center center', width:"100%",height:'calc(100vh - 60px)',
      display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{width:"600px", margin:"0 auto", textAlign:'center', height:'400px', 
      background:"rgb(0,0,0,0.8)", padding:"20px", color:"white", borderRadius:"5px"}}>
          <div style={{width:"100%", height:"80px", background:"mediumPurple",display:"flex",
        justifyContent:'center', alignItems:"center", fontSize:"24px",marginBottom:'50px',borderRadius:"5px"}}>
        Login <span> or sign in with </span>
        <a href="/auth/google"> Google</a>
        </div>

        <form onSubmit={this.onFormSubmit} className="col s6" autoComplete="off">

            <div className="input-field col s12 LAR">
            <input style={{color:'white'}}
            id="email" type='text' className={this.props.errors.email ? 'invalid' : 'validate'}
            value={this.state.email} 
            name='email' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="email">Email</label>
            <span className="helper-text" data-error={this.props.errors.email && this.props.errors.email} >
            </span>
            </div>
                        
            
            <div className="input-field col s12 LAR" >
            <input style={{color:'white'}}
            id="password" type='password' className={this.props.errors.password ? 'invalid' : 'validate'}
            value={this.state.password} 
            name='password' 
            onChange={this.onChangeHandle}/>
            <label htmlFor="password">Password</label>
            <span className="helper-text" data-error={this.props.errors.password && this.props.errors.password} >
            </span>
            </div>
            
            <button style={{background:"mediumPurple"}}
            className="btn waves-effect waves-light" 
            type="submit" name="action">
              Submit
              <i className="material-icons right">send</i>
            </button>

        </form>

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
        errors : state.errors
    }
}

export default connect(mapStateToProps, actions)(Login)
