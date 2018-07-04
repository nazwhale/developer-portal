import React, { Component } from "react";
import logo from "./assets/pixel_flower.png";
import "./App.css";
import Cards from "./components/cards";

class App extends Component {
  render() {
    console.log("card props", this.props);
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </header>
        <Cards />
      </div>
    );
  }
}

export default App;
