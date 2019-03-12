import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGoogleUser } from './components/actions/action'


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
                return (
                  <a href="/auth/google/logout"> 
                  <div style={{marginRight:"10px"}}>{this.props.currentUser && this.props.currentUser.name}</div>
                  logout</a>
                )
        }
    }

  render() {
    
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
}

const mapStateToProps = state => {
    return { 
        currentUser : state.currentUserGoogle
    }
}

export default  connect(mapStateToProps ,actions)(Test)