import React, { Component } from 'react'
import './styles/Loading.css'
export class Loading extends Component {
  render() {
    return (
        <div className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div>
        
    )
  }
}

export default Loading