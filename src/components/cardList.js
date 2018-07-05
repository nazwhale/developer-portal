import React, { Component } from "react";
import Card from "./card";
import CardPlaceholder from "./cardPlaceholder";
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

    //TODO: handle expired tokens gracefully
    //TODO: look into why images break eventually with "Failed to load resource: net::ERR_CONNECTION_RESET"
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN,
        "Content-Type": "application/json; charset=utf-8"
      }
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

    if (!projectsFetched) {
      const text = "Apps loading",
        skeletonText = "...................";
      return <CardPlaceholder text={text} subText={skeletonText} />;
    } else if (projects.length === 0) {
      return <CardPlaceholder text="No apps to display" subText="" />;
    } else {
      return (
        <React.Fragment>
          {projects.map(project => (
            <React.Fragment key={project.id}>
              <Card project={project} projectsFetched={projectsFetched} />
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }
  }
}

export default CardList;
