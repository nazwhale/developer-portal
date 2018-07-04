import React, { Component } from "react";
import "../App.css";

class Card extends Component {
  render() {
    const { id, created, name, logo } = this.props.app;
    return (
      <div className="Card" key={id}>
        <h3 className="Card-created">{created}</h3>
        <h1 className="Card-name">{name}</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default Card;
