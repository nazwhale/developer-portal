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
    if (this.state.imageLoaded) {
      return logo;
    } else {
      return placeholderLogo;
    }
  };

  render() {
    console.log("load", this.state.loaded);
    const { id, created, name, logo } = this.props.app;
    return (
      <React.Fragment>
        <div className="Card" key={id}>
          <h3 className="Card-created">{created}</h3>
          <h1 className="Card-name">{name}</h1>
          <img
            onLoad={this.onImageLoad}
            src={this.renderImage(logo)}
            className="App-logo"
            alt="logo"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Card;
