import React, { Component } from "react";
import Card from "./card";
import "../App.css";
import placeholderLogo from "../assets/placeholder_logo.png";

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      projectsFetched: false,
      projects: [
        {
          id: "",
          created: "Apps loading",
          name: "...............",
          logo: { placeholderLogo }
        } //TODO:refactor a Card's default state to the above, so a card with no props renders this
      ] //the api returns "apps", but we refer to them as "projects" to avoid confusion with the main App component
    };
  }

  componentDidMount() {
    const url = "https://guarded-thicket-22918.herokuapp.com/apps";
    const token = process.env.REACT_APP_API_TOKEN;

    //TODO: handle expired tokens gracefully
    //TODO: look into why images break eventually with "Failed to load resource: net::ERR_CONNECTION_RESET"
    //TODO: look into what I really need in the request
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

    // if (projectsFetched === false) {
    //   return (
    //     <Card
    //       project={{
    //         id: "",
    //         created: "Apps loading",
    //         name: "...............",
    //         logo: { placeholderLogo }
    //       }}
    //     />
    //   );
    // } else
    if (projectsFetched && projects.length === 0) {
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
