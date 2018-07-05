import React, { Component } from "react";
import "../App.css";

class CardUsers extends Component {
  constructor() {
    super();
    this.state = {
      usersFetched: false,
      users: []
    };
  }

  componentDidMount() {
    this.fetchData(this.props.project.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.project.id !== prevProps.project.id) {
      this.fetchData(this.props.project.id);
    }
  }

  fetchData = id => {
    const url = `https://guarded-thicket-22918.herokuapp.com/apps/${id}/users`;

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
  };

  render() {
    return (
      <div className="Card-users" key={this.props.project.id}>
        {this.state.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    );
  }
}

export default CardUsers;
