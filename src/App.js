import React, { Component } from "react";
import "./css/App.css";
import CardList from "./components/cardList";
import Header from "./components/header";

import AuthService from "./components/login/AuthService";
import withAuth from "./components/login/withAuth";
const Auth = new AuthService();

class App extends Component {
  //should test accessToken instead of just expiry - there could be other reasons why it's no longer valid (e.g. servor error)
  bouncer = () => {
    const token = Auth.getToken();
    if (Auth.isTokenExpired(token)) {
      Auth.logout();
      this.props.history.replace("/login");
    }
    setTimeout(this.bouncer, 2000); //check if token expired every 2s
  };

  render() {
    this.bouncer();
    return (
      <div className="App">
        <Header user={this.props.user} history={this.props.history} />
        <CardList />
      </div>
    );
  }
}

export default withAuth(App);
