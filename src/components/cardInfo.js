import React, { Component } from "react";
import "../App.css";
import placeholderLogo from "../assets/placeholder_logo.png";

class CardInfo extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageLoaded: false,
      id: this.props.project.id,
      name: this.props.project.name,
      created: this.props.project.created,
      logo: this.props.project.logo,
      newName: "",
      newLogo: ""
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

  handleSubmitNewName = event => {
    event.preventDefault();
    const data = { name: this.state.newName };
    const url = `https://guarded-thicket-22918.herokuapp.com/apps/${
      this.state.id
    }`;

    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log("response", response);
        response.json();
        this.setState({ name: data.name });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  handleNameChange = event => {
    this.setState({ newName: event.target.value });
  };

  handleSubmitNewLogo = event => {
    event.preventDefault();
    const data = { logo: this.state.newLogo };
    const url = `https://guarded-thicket-22918.herokuapp.com/apps/${
      this.state.id
    }`;

    return fetch(url, {
      method: "PUT",
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json();
        this.setState({ logo: data.logo });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  handleLogoChange = event => {
    this.setState({ newLogo: event.target.value });
  };

  render() {
    const { created, name, logo } = this.state;
    return (
      <div>
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

        <form onSubmit={this.handleSubmitNewName}>
          <label htmlFor="username">
            Enter new name
            <input
              type="text"
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </label>
          <input type="submit" value="submit" />
        </form>

        <form onSubmit={this.handleSubmitNewLogo}>
          <label htmlFor="logo">
            Enter logo url
            <input
              type="text"
              value={this.state.newLogo}
              onChange={this.handleLogoChange}
            />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default CardInfo;