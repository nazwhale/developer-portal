import React, { Component } from "react";
import "./css/App.css";
import Projects from "./components/projects";
import Header from "./components/header";

import AuthService from "./components/login/AuthService";
import withAuth from "./components/login/withAuth";
const Auth = new AuthService();

class App extends Component {
  bouncer = () => {
    const token = Auth.getToken();
    if (Auth.isTokenExpired(token)) {
      Auth.logout();
      this.props.history.replace("/login");
    }
    setTimeout(this.bouncer, 2000); //check if token has expired every 2s
  };

  render() {
    this.bouncer();
    return (
      <div className="App">
        <Header user={this.props.user} history={this.props.history} />
        <Projects />
      </div>
    );
  }
}

export default withAuth(App);
