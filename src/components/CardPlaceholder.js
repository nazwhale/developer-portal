import React, { Component } from "react";
import "../css/App.css";

class CardPlaceholder extends Component {
  render() {
    return (
      <div className="Card">
        <h3 className="Card-text-created">{this.props.text}</h3>
        <h1 className="Card-text-name">{this.props.subText}</h1>
      </div>
    );
  }
}

export default CardPlaceholder;
