import React, { Component } from "react";
import "./App.css";
import CardList from "./components/cardList";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CardList />
      </div>
    );
  }
}

export default App;
