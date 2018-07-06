import React, { Component } from "react";
import "../../css/Login.css";
import AuthService from "./AuthService";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  handleFormSubmit = e => {
    e.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="center">
        <div className="card">
          <h3>Welcome to the dev portal</h3>
          <h3>Login here...</h3>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
}

export default Login;
