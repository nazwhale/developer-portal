import decode from "jwt-decode";
import { fetchFromAPI } from "../helpers/apiHelpers.js";

const TOKEN_KEY = "bloom_id_token";

export default class AuthService {
  login = (email, password) => {
    return fetchFromAPI("login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => {
      this.setToken(response.accessToken);
      return Promise.resolve(response);
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
    localStorage.setItem(TOKEN_KEY, idToken);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getProfile = () => {
    return decode(this.getToken());
  };
}
