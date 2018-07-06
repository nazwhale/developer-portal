import React, { Component } from "react";
import logo from "../assets/pixel_flower.png";
import "../css/App.css";

import AuthService from "./login/AuthService";
const Auth = new AuthService();

class Header extends Component {
  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
  };

  render() {
    return (
      <header className="Header">
        <img src={logo} className="Header-logo" alt="logo" />
        <a>Dev Portal - My Apps</a>
        <div className="Header-right">
          <a>Hi {this.props.user.email}</a>
          <button
            type="button"
            className="Header-logout-button"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
