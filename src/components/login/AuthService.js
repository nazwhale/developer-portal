import decode from "jwt-decode";

export default class AuthService {
  login = (email, password) => {
    const domain = "https://guarded-thicket-22918.herokuapp.com";
    console.log("Fetching token for:", email, password);

    return this.fetch(`${domain}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.accessToken);
      return Promise.resolve(res);
    });
  };

  loggedIn() {
    const token = this.getToken();
    return token !== null && this.isTokenExpired(token) === false;
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem("bloom_id_token", idToken);
  }

  getToken() {
    return localStorage.getItem("bloom_id_token");
  }

  logout() {
    localStorage.removeItem("bloom_id_token");
  }

  getProfile = () => {
    return decode(this.getToken());
  };

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    if (this.loggedIn()) {
      headers["Authorization"] = this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else if (response.status === 401) {
      throw new Error("Invalid login details - please try again");
    } else {
      throw new Error(response.statusText);
    }
  }
}
