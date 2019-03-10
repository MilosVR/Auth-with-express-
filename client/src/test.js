import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGoogleUser, logoutGoogleUser, loginGoogleUser,loginWithGoogle,logoutWithGoogle } from './components/actions/action'


class Test extends Component {

    componentDidMount(){
        this.props.fetchGoogleUser()
      }

    renderComponent = () => {
        switch (this.props.currentUser) {
           
            case null :
                return

            case false : 
                return <a href="/auth/google"> login</a>

            default:
                return <a href="/auth/google/logout"> logout</a>
        }
    }

  render() {
    console.log(this.props.currentUser)
    return (
      <div>
        <h3 style={{marginTop:"100px"}}>Google Auth</h3>
        {this.renderComponent()}
      </div>
    )
  }
}
const actions = {
    fetchGoogleUser,
    logoutGoogleUser,
    loginGoogleUser,
    loginWithGoogle,
    logoutWithGoogle
}

const mapStateToProps = state => {
    return { 
        currentUser : state.currentUserGoogle
    }
}

export default  connect(mapStateToProps ,actions)(Test)