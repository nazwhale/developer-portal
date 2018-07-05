import React, { Component } from "react";
import "../App.css";
import placeholderLogo from "../assets/placeholder_logo.png";

class Card extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageLoaded: false,
      id: this.props.project.id,
      name: this.props.project.name,
      created: this.props.project.created,
      logo: this.props.project.logo,
      buttonValue: ""
    };
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

  handleSubmit = event => {
    event.preventDefault();
    const data = { name: this.state.buttonValue };
    const url = `https://guarded-thicket-22918.herokuapp.com/apps/${
      this.state.id
    }`;

    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: data
    })
      .then(response => {
        response.json();
        this.setState({ name: data.name });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  setText = event => {
    this.setState({ buttonValue: event.target.value });
  };

  render() {
    const { id, created, name, logo } = this.state;
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

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            Enter username
            <input
              type="text"
              value={this.state.value}
              onChange={this.setText}
            />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Card;
