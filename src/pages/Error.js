import React, { Component } from 'react'
import './styles/Error.css'
export class Error extends Component {

  render() {
    return (
      <div className='error-container' >
        {`Sorry  ${this.props.error}`}</div>
    )
  }
}

export default Error