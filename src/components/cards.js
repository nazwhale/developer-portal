import React, { Component } from "react";
import Card from "./card";
import "../App.css";

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      apps: []
    };
  }

  componentDidMount() {
    const url = "https://guarded-thicket-22918.herokuapp.com/apps";
    const token = process.env.REACT_APP_API_TOKEN;

    return fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, cors, *same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8"
      }
      // redirect: "follow", // manual, *follow, error
      // referrer: "no-referrer" // no-referrer, *client
    })
      .then(response => {
        response.json().then(body => {
          this.setState({ apps: body.apps });
        });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  render() {
    return (
      <React.Fragment>
        {this.state.apps.map(app => (
          <React.Fragment>
            <Card
              key={app.id}
              name={app.name}
              created={app.created}
              logo={app.logo}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
    // }
  }
}

export default Cards;
