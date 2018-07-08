import React, { Component } from "react";
import "../css/App.css";
import { fetchFromAPI } from "./helpers/apiHelpers.js";

class ProjectUsers extends Component {
  constructor() {
    super();
    this.state = {
      usersFetched: false,
      users: [],
      offset: 0
    };
  }

  componentDidMount() {
    this.fetchUsers(this.props.project.id, this.state.offset);
  }

  componentDidUpdate(prevProps) {
    if (this.props.project.id !== prevProps.project.id) {
      this.setState({ offset: 0 });
      this.fetchUsers(this.props.project.id, this.state.offset);
    }
  }

  fetchUsers = (id, offset) => {
    return fetchFromAPI(`apps/${id}/users?offset=${offset}`, {
      method: "GET"
    }).then(body => {
      this.setState({ usersFetched: true, users: body.users });
    });
  };

  renderPreviousButton = () => {
    if (this.state.offset > 0) {
      return (
        <React.Fragment>
          <button
            type="button"
            className="Card-users-button"
            onClick={this.getPrevious25}
          >
            Previous 25
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <button type="button" className="Card-users-button-disabled">
          Previous 25
        </button>
      );
    }
  };

  renderNextButton = () => {
    if (this.state.users.length === 25) {
      return (
        <React.Fragment>
          <button
            type="button"
            className="Card-users-button"
            onClick={this.getNext25}
          >
            Next 25
          </button>
        </React.Fragment>
      );
    }
    return (
      <button type="button" className="Card-users-button-disabled">
        Next 25
      </button>
    );
  };

  getPrevious25 = () => {
    const newOffset = this.state.offset - 25;
    this.setState({ offset: newOffset });
    this.fetchUsers(this.props.project.id, newOffset);
  };

  getNext25 = () => {
    const newOffset = this.state.offset + 25;
    this.setState({ offset: this.state.offset + 25 });
    this.fetchUsers(this.props.project.id, newOffset);
  };

  calculatePageNumber = () => {
    return this.state.offset / 25 + 1;
  };

  render() {
    return (
      <div className="Card-users" key={this.props.project.id}>
        <h1 className="Card-text-name">
          {this.props.project.name} users (page {this.calculatePageNumber()})
        </h1>
        {this.state.users.map(user => <div key={user.id}>{user.name}</div>)}
        {this.renderPreviousButton()}
        {this.renderNextButton()}
      </div>
    );
  }
}

export default ProjectUsers;
