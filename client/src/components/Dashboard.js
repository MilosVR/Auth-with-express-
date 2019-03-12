import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchGoogleUser } from '../components/actions/action'

class Dashboard extends Component {

  //componentDidMount(){
    //this.props.fetchGoogleUser()
    //if (!this.props.auth.isAuthenticated || !this.props.currentUser ) {
      //this.props.history.push('/login')
    //}
  //}

  render() {
    return (
      <div style={{width:'100%', height:'calc(100vh - 60px)', background:"url(/assets/dashboard.jpg) center center",
                  display:'flex', justifyContent:"center", alignItems:'center', }}>
        <div style={{fontSize:"40px", color:"white", padding:"20px",borderRadius:"3px"}}>
        <img src="/assets/Welcome.gif" alt='' style={{width:'80%', }}/>
        </div>
      </div>
    )
  }
}
const actions = {
  fetchGoogleUser,
}
const mapStateToProps = state => {
  return {
      auth : state.auth,
      errors : state.errors,
      currentUser : state.currentUserGoogle
  }
}

export default connect(mapStateToProps,actions)(Dashboard)