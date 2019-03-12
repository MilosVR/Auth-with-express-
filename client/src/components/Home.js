import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div style={{width:"100%", height:'calc(100vh - 60px)', background:"url(/assets/officeBackground.jpg) center center",
                  display:'flex', justifyContent:'center', alignItems:"center"}} >
        <div style={{fontFamily:"'Righteous', cursive"}}>
        <h1>Authentication with Express.js</h1><br/>
        <h3>- Passport & JWT & Google Strategy -</h3>
        </div>
      </div>
    )
  }
}
