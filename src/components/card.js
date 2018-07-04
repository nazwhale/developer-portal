import React, { Component } from "react";
import "../App.css";

class Card extends Component {
  render() {
    return (
      <div className="Card">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="Card-name">An App</h1>
      </div>
    );
  }
}

export default Card;
