import React, { Component } from "react";
import CardInfo from "./cardInfo";
import CardPlaceholder from "./cardPlaceholder";
import CardUsers from "./cardUsers";
import "../App.css";

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      projectsFetched: false,
      projects: [], //the api returns "apps", but we refer to them as "projects" to avoid confusion with the main App component
      selectedProject: {}
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
          this.setState({
            projectsFetched: true,
            projects: body.apps,
            selectedProject: body.apps[0]
          });
        });
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  handleClick = project => {
    console.log("button");
    this.setState({ selectedProject: project });
  };

  render() {
    //TODO: refactor this
    const { projectsFetched, projects } = this.state;

    if (!projectsFetched) {
      const text = "Apps loading",
        skeletonText = "...................";
      return <CardPlaceholder text={text} subText={skeletonText} />;
    } else if (projects.length === 0) {
      return (
        <CardPlaceholder text="No apps to display. Go make one!" subText="" />
      );
    } else {
      return (
        <React.Fragment>
          {projects.map(project => (
            <div className="Card" key={project.id}>
              <CardInfo project={project} projectsFetched={projectsFetched} />
              <button onClick={() => this.handleClick(project)}>Select</button>
            </div>
          ))}
          <CardUsers project={this.state.selectedProject} />
        </React.Fragment>
      );
    }
  }
}

export default CardList;
