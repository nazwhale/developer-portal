import React, { Component } from "react";
import "../../css/Login.css";
import AuthService from "./AuthService";
import Logo from "./../../assets/pixel_flower.png";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.replace("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(err);
      });
  };

  isLoading = () => {
    if (this.state.loading === true) {
      return <h3>Loading...</h3>;
    }
    return <h3>Login here...</h3>;
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="center">
          <div className="card">
            <h3>Welcome to the dev portal</h3>
            {this.isLoading()}
            <form onSubmit={this.handleFormSubmit}>
              <input
                className="form-item"
                placeholder="Email"
                name="email"
                type="text"
                onChange={this.handleChange}
              />
              <input
                className="form-item"
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              <input className="form-submit" value="SUBMIT" type="submit" />
            </form>
          </div>
        </div>
        <img src={Logo} alt="pixel flower logo" className="Logo" />
      </React.Fragment>
    );
  }
}

export default Login;
