import React, { Component } from "react";
import "./styles/Hero.css";

export class Hero extends Component {
  render() {
    return (
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome !&nbsp;</h1>
          <br/>
          <p>
            Here you can explore different posts or even create own posts...{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Hero;
