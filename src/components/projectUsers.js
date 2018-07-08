import React, { Component } from "react";
import "../css/App.css";
import { fetchFromAPI } from "./helpers/apiHelpers.js";

class ProjectUsers extends Component {
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
    return fetchFromAPI(`apps/${id}/users`, {
      method: "GET"
    }).then(body => {
      this.setState({ usersFetched: true, users: body.users });
    });
  };

  render() {
    return (
      <div className="Card-users" key={this.props.project.id}>
        <h1 className="Card-text-name">{this.props.project.name} users:</h1>
        {this.state.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    );
  }
}

export default ProjectUsers;
