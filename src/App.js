import React, { Component } from "react";
import logo from "./assets/pixel_flower.png";
import "./App.css";
import CardList from "./components/cardList";

class App extends Component {
  render() {
    //TODO: extract <Header /> component
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-title-container">Dev Portal</span>
          </div>
        </header>
        <CardList />
      </div>
    );
  }
}

export default App;
