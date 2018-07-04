import React, { Component } from "react";
import "../App.css";

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <img href={this.props.logo} className="App-logo" alt="logo" />
        <h1>{this.props.created}</h1>
        <h1 className="Card-name">{this.props.name}</h1>
      </div>
    );
  }
}

export default Card;
