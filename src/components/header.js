import React, { Component } from "react";
import logo from "../assets/pixel_flower.png";
import "../App.css";

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="Header-logo-container">
          <img src={logo} className="Header-logo" alt="logo" />
          <span className="Header-title-container">Bloom Dev Portal</span>
        </div>
      </header>
    );
  }
}

export default Header;
