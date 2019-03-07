import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <div style={{width:'100%', height:'calc(100vh - 60px)', background:"url(/assets/dashboard.jpg)", 
      backgroundSize:"1400px 700px"}}>
        <div style={{fontSize:"40px"}}>Dashboard</div>
      </div>
    )
  }
}
