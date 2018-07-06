import React, { Component } from "react";
import "./App.css";
import CardList from "./components/cardList";
import Header from "./components/header";

import AuthService from "./components/AuthService";
import withAuth from "./components/withAuth";
const Auth = new AuthService();

class App extends Component {
  handleLogout() {
    console.log(this.props);
    Auth.logout();
    this.props.history.replace("/login");
  }

  render() {
    return (
      <div className="App">
        <h2>Welcome {this.props.user.username}</h2>
        <p className="App-intro">
          <button
            type="button"
            className="form-submit"
            onClick={this.handleLogout.bind(this)}
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
