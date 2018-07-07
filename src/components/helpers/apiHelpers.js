// import AuthService from "./login/AuthService";
// const Auth = new AuthService();

// if (this.loggedIn()) {
//   headers["Authorization"] = this.getToken();
// }

const domain = "https://guarded-thicket-22918.herokuapp.com";

export function fetchFromAPI(path, options) {
  const url = `${domain}/${path}`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const apiToken = localStorage.getItem("bloom_id_token");
  if (apiToken !== null) {
    headers["Authorization"] = apiToken;
  }

  return fetch(url, {
    headers,
    ...options
  })
    .then(_checkStatus)
    .then(response => response.json());
}

const _checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    throw error;
  }
};
