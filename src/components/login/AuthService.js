import decode from "jwt-decode";

export default class AuthService {
  login = (email, password) => {
    const domain = "https://guarded-thicket-22918.herokuapp.com"; // API server domain
    console.log("fetching token for:", email, password);

    // Get a token from api server using the fetch api
    return this.fetch(`${domain}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        expiry: "10s"
      })
    }).then(res => {
      console.log("response", res);
      this.setToken(res.accessToken); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  };

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return token !== null && this.isTokenExpired(token) === false; // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    console.log("setting token", idToken);
    // Saves user token to localStorage
    localStorage.setItem("bloom_id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("bloom_id_token");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("bloom_id_token");
  }

  getProfile = () => {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  };

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
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
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
