import React, { Component } from "react";
import "./styles/Footer.css";

export class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <p>© 2022 - 2023</p>
          <p>
            Created with <span className="heart">&hearts;</span> by Deepak
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
