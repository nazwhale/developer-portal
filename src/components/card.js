import React, { Component } from "react";
import "../App.css";
import placeholderLogo from "../assets/placeholder_logo.png";

class Card extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { imageLoaded: false };
  }

  onImageLoad = () => {
    this.setState(() => ({ imageLoaded: true }));
  };

  renderImage = logo => {
    if (!this.state.imageLoaded) {
      return placeholderLogo;
    }
    return logo;
  };

  parseCreatedDatetime = datetime => {
    return datetime.split("T")[0];
  };

  render() {
    const { id, created, name, logo } = this.props.project;
    return (
      <div className="Card" key={id}>
        <h3 className="Card-text-created">
          {this.parseCreatedDatetime(created)}
        </h3>
        <h1 className="Card-text-name">{name}</h1>
        <img
          onLoad={this.onImageLoad}
          src={this.renderImage(logo)}
          className="Card-logo"
          alt="logo"
        />
      </div>
    );
  }
}

export default Card;
