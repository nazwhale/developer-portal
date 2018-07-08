# Developer Portal

### Brief

“Your task is to build a browser-based developer portal in JavaScript against a dummy API that we've created! 🎉"

Requirements:

1. Log-in with email and password
2. Prompt to log-in again if access token expires
3. List apps
4. Update the name and logo of each app
5. List users for each app
6. Page through list of users

### Overview

```
$ git clone git@github.com:nazwhale/developer-portal.git
$ cd developer-portal
$ yarn install
$ yarn start
```

Then visit http://localhost:3000/ to see the app. You'll be redirected to the login screen (pictured below).

To login, in the email field enter whatever you like, and in the password field enter `hunter2`.

![Login view](https://i.imgur.com/NHNtdGC.png)

Once logged-in, you'll see the apps returned by the dummy API, and a list of users for the currently selected app.

![Main view](https://i.imgur.com/MhpSC3G.png)

### Future iterations

Code quality improvements:

* add static type checking (with Flow)
* add tests with Jest
* consider using Redux, to better manage state
* consider using CSS variables and frameworks to reduce repetition
* validate logo url and login email
* handle slower network connections more gracefully
* test responsiveness with larger screens before mobile
* refactor render methods

Bugs to fix:

* fix a bug where updating the name of an app doesn't update the app name at the top of the list of users (unless you refresh the app)
* handle image load timeouts gracefully (currently the image "breaks")

UI improvements:

* styled error messages (instead of alerts)
* error message after redirection on token expiry
* loading spinner (instead of text)
* list apps in a more useful way (e.g. in the order they were created/alphabetically)
