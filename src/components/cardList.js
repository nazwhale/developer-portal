import React, { Component } from "react";
import Card from "./card";
import "../App.css";

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      projectsFetched: false,
      projects: [] //the api returns "apps", but we refer to them as "projects" to avoid confusion with the main App component
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
          this.setState({ projectsFetched: true, projects: body.apps });
        });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  render() {
    //TODO: refactor this
    const { projectsFetched, projects } = this.state;
    console.log(projects);

    if (projectsFetched === false) {
      return (
        <div className="Card">
          <h3 className="Card-text-created">Apps loading...</h3>
        </div>
      );
    } else if (projects.length === 0) {
      return (
        <div className="Card">
          <h3 className="Card-text-created">No apps to display!</h3>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {projects.map(project => (
            <React.Fragment key={project.id}>
              <Card project={project} />
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }
  }
}

export default CardList;
