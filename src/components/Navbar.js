import React, { Component } from "react";
import "./styles/Navbar.css";
import { logo } from "../assets";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getpostid = (id) => {
    return window.location.pathname.split("/")[2];
  }
  render() {

    return (
      <>
        <div className="nav-items">
          <div className="navlogo">
            <Link to={"/"}>
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          <div className={`${this.props.btnState ? "nav-item" : "hidden"}`}>
            <Link className="nav-text" to={"/createpost"}>
              Create New Post
            </Link>
          </div>
          <div className={`${this.props.editBtn ? "nav-item" : "hidden"}`}>
            <Link className="nav-text" to={`/post/update/${this.getpostid()}`}>
              Click To Edit This Post
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
