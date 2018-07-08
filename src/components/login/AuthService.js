import decode from "jwt-decode";
import { fetchFromAPI } from "../helpers/apiHelpers.js";

export default class AuthService {
  login = (email, password) => {
    return fetchFromAPI("login", {
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
}
