import React, { Component } from "react";
import ProjectInfo from "./projectInfo";
import ProjectUsers from "./projectUsers";
import CardPlaceholder from "./cardPlaceholder";
import "../css/App.css";
import usersIcon from "../assets/users_icon.png";
import { fetchFromAPI } from "./helpers/apiHelpers.js";

class Projects extends Component {
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
    return fetchFromAPI("apps", {
      method: "GET"
    }).then(body => {
      if (body.error === undefined) {
        this.setState({
          projectsFetched: true,
          projects: body.apps,
          selectedProject: body.apps[0]
        });
      } else {
        this.setState({ error: body.error });
      }
    });
  }

  selectProject = project => {
    this.setState({ selectedProject: project });
  };

  isSelected = project => {
    if (project.id === this.state.selectedProject.id) {
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
    const { projectsFetched, projects, error, selectedProject } = this.state;
    if (error !== "") {
      return <CardPlaceholder text={`🛑Error: ${error}`} />;
    } else if (projectsFetched === false) {
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
                  <ProjectInfo
                    project={project}
                    projectsFetched={projectsFetched}
                    selectedProjectId={selectedProject.id}
                  />
                </div>
                {this.isSelected(project)}
              </div>
            ))}
          </div>
          <div className="Right">
            <ProjectUsers project={selectedProject} />
          </div>
        </div>
      );
    }
  }
}

export default Projects;
