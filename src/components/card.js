import React, { Component } from "react";
import "../App.css";
import CardInfo from "./cardInfo";
import CardUsers from "./cardUsers";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      usersFetched: false,
      users: [] //the api returns "apps", but we refer to them as "projects" to avoid confusion with the main App component
    };
  }

  componentDidMount() {
    const url = `https://guarded-thicket-22918.herokuapp.com/apps/${
      this.props.project.id
    }/users`;

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN,
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        response.json().then(body => {
          this.setState({ usersFetched: true, users: body.users });
          console.log("users", this.state.users);
        });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  render() {
    return (
      <div className="Card" key={this.props.project.id}>
        <CardInfo
          project={this.props.project}
          projectsFetched={this.props.projectsFetched}
        />
        <CardUsers users={this.state.users} />
      </div>
    );
  }
}

export default Card;
