import React, { Component } from "react";
import "./css/App.css";
import CardList from "./components/cardList";
import Header from "./components/header";

import AuthService from "./components/login/AuthService";
import withAuth from "./components/login/withAuth";
const Auth = new AuthService();

class App extends Component {
  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
  };

  bouncer = () => {
    const token = Auth.getToken();
    if (Auth.isTokenExpired(token)) {
      this.handleLogout();
    }
    setTimeout(this.bouncer, 2000); //check if token expired every 2s
  };

  render() {
    this.bouncer();
    return (
      <div className="App">
        <h2>Welcome {this.props.user.email}</h2>
        <p className="App-intro">
          <button
            type="button"
            className="form-submit"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </p>
        <Header />
        <CardList />
      </div>
    );
  }
}

export default withAuth(App);
