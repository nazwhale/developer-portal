// // Setting Authorization header
// if (this.loggedIn()) {
//   headers["Authorization"] = this.getToken();
// }
// import AuthService from "./login/AuthService";
// const Auth = new AuthService();

const domain = "https://guarded-thicket-22918.herokuapp.com";

export function fetchToken(options) {
  const url = `${domain}/login`;

  // performs api calls sending the required authentication headers
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  return fetch(url, {
    headers,
    ...options
  })
    .then(_checkStatus)
    .then(response => response.json());
}

export function fetchProjects(options) {
  const url = `${domain}/apps`;

  // performs api calls sending the required authentication headers
  const headers = {
    Authorization: localStorage.getItem("bloom_id_token"),
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  return fetch(url, {
    headers,
    ...options
  })
    .then(_checkStatus)
    .then(response => response.json());
}

const _checkStatus = response => {
  // raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) {
    // Success status lies between 200 to 300
    return response;
  } else {
    throw new Error(response.statusText);
  }
};
