import React, { Component } from 'react'
import { connect } from 'react-redux';


class Dashboard extends Component {

  componentDidMount(){
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div style={{width:'100%', height:'calc(100vh - 60px)', background:"url(/assets/dashboard.jpg)", 
      backgroundSize:"1400px 700px"}}>
        <div style={{fontSize:"40px"}}>Dashboard</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      auth : state.auth,
      errors : state.errors
  }
}

export default connect(mapStateToProps)(Dashboard)