import React, { Component } from "react";
import Card from "./card";
import "../App.css";

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      projects: [] //the api returns "apps", but from here on we refer to them as "projects" to avoid confusion with the main App component
    };
  }

  componentDidMount() {
    const url = "https://guarded-thicket-22918.herokuapp.com/apps";
    const token = process.env.REACT_APP_API_TOKEN;

    //TODO: handle expired tokens gracefully
    return fetch(url, {
      method: "GET",
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
          this.setState({ projects: body.apps });
        });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  render() {
    console.log(this.state.projects);
    return (
      <React.Fragment>
        {this.state.projects.map(project => (
          <React.Fragment key={project.id}>
            <Card project={project} />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default Cards;
