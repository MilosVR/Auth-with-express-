import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from './components/actions/action'
import { withRouter } from 'react-router-dom'


class Navbar extends Component {

  state = {
    showMenu : false
  }

  dropdawnShow = () => {
    this.setState({
      showMenu : !this.state.showMenu
    })
  }

  logOut = e => {
    e.preventDefault()
    this.props.logoutUser()
    this.props.history.push('/')
  }

  render() {
    console.log(this.props.auth.isAuthenticated);
    
    return (
      <div style={{width:'100%', height:"60px", display:"flex", justifyContent:"center", 
                   alignItems:"center", background:"black", color:'white'}}>
      
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"960px"}}>
      
        <div>
          <Link to='/'><img alt='' src='/assets/logo.png' 
          style={{width:"130px", height:"50px"}}/>
          </Link>
        </div>

        <div>
      {this.props.auth.isAuthenticated ?
       
        <div style={{display:'block', width:"150px", position:'relative', textAlign:'center'}}>

         <div style={{display:'flex', alignItems:'center', justifyContent:"center"}}>
         <img src={this.props.auth.users.avatar} alt='' onClick={this.dropdawnShow}
         style={{width:"30px", height:"30px", borderRadius:"50%", marginRight:"10px",cursor:'pointer'}} />
        {this.props.auth.users.name}
      
         </div>

         {this.state.showMenu && 
         
         <div style={{position:'absolute', left:'0', top:"45px", border:'1px solid mediumPurple'}}> 

          <div className='menuItemDrop' style={{borderBottom:'1px solid mediumPurple'}}>
            <span >Bio</span>
          </div>

          <div className='menuItemDrop' style={{borderBottom:'1px solid mediumPurple'}}>
            <span >My Profile</span>
          </div>
         
          <div className='menuItemDrop' onClick={this.logOut} >
            <span >Logout</span>
          </div>
        </div>} 

       </div>

       : <div>
       <Link to='/login'>
      <button style={{border:'none', outline:'none', background:"mediumslateblue", color:"white",
      padding:"10px", cursor:'pointer', marginRight:"10px", borderRadius:"3px"}}>Login</button>
      </Link>

      <Link to='/register'>
      <button style={{border:'none', outline:'none', background:"mediumslateblue", color:"white",
      padding:"10px", cursor:'pointer', borderRadius:"3px"}}>Sign up</button>
      </Link>
     </div> 
      }

        </div>
        </div>
      </div>
    )
  }
}

const actions = {
  logoutUser
}

const mapStateToProps = state => {
  return {
    auth : state.auth,
  }
}

export default connect(mapStateToProps, actions)(withRouter(Navbar))