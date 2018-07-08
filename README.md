# 👨‍💻 Developer Portal

### Brief

> Your task is to build a browser-based developer portal in JavaScript against a dummy API that we've created! 🎉

Requirements:

1. Log-in with email and password
2. Prompt to log-in again if access token expires
3. List apps
4. Update the name and logo of each app
5. List users for each app
6. Page through list of users

### Overview

I build my developer portal as a web-app in React.js. It was created with [Create React App](https://github.com/facebook/create-react-app) and styled as "Bloom Dev Portal".

Here's how to get going...

```
$ git clone git@github.com:nazwhale/developer-portal.git
$ cd developer-portal
$ yarn install
$ yarn start
```

Then visit http://localhost:3000/ to see the app. You'll be redirected to the login screen (pictured below).

To login, in the email field enter whatever you like, and in the password field enter `hunter2`.

![Login view](https://i.imgur.com/NHNtdGC.png)

Once logged-in, you'll see the apps returned by the dummy API and a list of users for the currently selected app:

![Main view](https://i.imgur.com/MhpSC3G.png)

### UI philosophy

My user is an app developer. They might be a novice, but I can assume a decent familiarity with tech. This knowledge influences the tradeoffs I can make.

For example, a user comfortable with tech might have a greater threshold for complexity than the average user due to their familiarity with interfaces, but when they want information, they'll likely want it fast. As a result I considered trading-off a more cluttered UI in favour of having all the necessary information at easy reach (rather than hidden away in other views).

I also want the app to feel native to my user. As an app developer, I've assumed some familiarity with Google products, and have taken some inspiration from Material Design (for example, the 3D feel of the cards achieved by drop shadows).

I've not adhered to Material Design's guidelines strictly, as I wanted to give the app some character. If my app can inspire a positive emotional reaction from my user, I've got more of their gumption to play with (inspired by [this article](http://andrewchen.co/psychd-funnel-conversion/)).

To achieve this, I've thought about the interests of my user and have given a slight nod to nerd culture with my Super Mario colour scheme and code-style monospaced font. I chose not to go too heavy handed with the theme, as I still want the app to appear professional and to allow the user to get the information they need with minimal distraction.

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
