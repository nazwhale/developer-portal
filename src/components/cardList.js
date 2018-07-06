import React, { Component } from "react";
import CardInfo from "./cardInfo";
import CardPlaceholder from "./cardPlaceholder";
import CardUsers from "./cardUsers";
import "../css/App.css";
import usersIcon from "../assets/users_icon.png";

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      projectsFetched: false,
      error: "",
      projects: [], //the api returns "apps", but we refer to them as "projects" to avoid confusion with the main App component
      selectedProject: {}
    };
  }

  componentDidMount() {
    const url = "https://guarded-thicket-22918.herokuapp.com/apps";

    //TODO: handle expired tokens gracefully
    //TODO: look into why images break eventually with "Failed to load resource: net::ERR_CONNECTION_RESET"
    return (
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_API_TOKEN,
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => {
          response.json().then(body => {
            if (body.error === undefined) {
              this.setState({
                projectsFetched: true,
                projects: body.apps,
                selectedProject: body.apps[0]
              });
              console.log("state", this.state);
              console.log();
            } else {
              this.setState({ error: body.error });
            }
          });
        })
        //TODO: check if I'm doing this right (I suspect not)
        .catch(error => console.error(`Fetch Error =\n`, error))
    );
  }

  selectProject = project => {
    this.setState({
      selectedProject: project
    });
  };

  isSelected = project => {
    console.log(project.id);
    if (project.id === this.state.selectedProject.id) {
      console.log("match");
      return (
        <input
          onClick={() => this.selectProject(project)}
          type="image"
          alt="users icon"
          src={usersIcon}
          className="Card-user-icon selected"
        />
      );
    }
    return (
      <input
        onClick={() => this.selectProject(project)}
        type="image"
        alt="users icon"
        src={usersIcon}
        className="Card-user-icon"
      />
    );
  };

  render() {
    //TODO: refactor this
    const { projectsFetched, projects, error, selectedProject } = this.state;
    if (error !== "") {
      return <CardPlaceholder text={`🛑Error: ${error}`} />;
    } else if (!projectsFetched) {
      return <CardPlaceholder text="Apps loading..." subText="" />;
    } else if (projects.length === 0) {
      return (
        <CardPlaceholder text="No apps to display. Go make one!" subText="" />
      );
    } else {
      return (
        <div className="Card-container">
          <div className="Left">
            {projects.map(project => (
              <div className="Card" key={project.id}>
                <div>
                  <CardInfo
                    project={project}
                    projectsFetched={projectsFetched}
                  />
                </div>
                {this.isSelected(project)}
              </div>
            ))}
          </div>
          <div className="Right">
            <CardUsers project={selectedProject} />
          </div>
        </div>
      );
    }
  }
}

export default CardList;
