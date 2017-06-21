# Mobi App
Mobile Application that allows you to handle your car expenses. This application is made with React Native.

## Tools used in this project
* [React Native](https://facebook.github.io/react-native/)
* [React](https://facebook.github.io/react/)
* [ESLint](https://github.com/eslint/eslint)
* [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) as plugin for helping us to follow the airbnb code style guide.
* [Jest](https://facebook.github.io/jest/)
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
* [React Native Elements](https://github.com/react-native-community/react-native-elements)
* [Feathers](http://feathersjs.com/)

**Pending tools:**
* React Native routing solution
* Application intro
* Redux
* Push notifications system


## Getting started
1. [Fork this repository](https://github.com/ingenieriasapco/mobi-app).
2. Clone your repository ```git@github.com:YOUR_GITHUB_USER/mobi-app.git```.
3. Change the current directory to the project ```cd mobi-app```.
4. Install the project dependencies ```npm install```.
5. Make sure you have correctly installed React Native and the **Android/iOS** environment following the [React Native official guide](https://facebook.github.io/react-native/docs/getting-started.html#content).
6. Start the server ```react-native start```
7. Inside another terminal run the application in debug mode ```react-native run-android``` for **Android**, in case you are running the project for **iOS** run ```react-native run-ios```.

## Workflow
We use [airbnb-javascript](https://github.com/airbnb/javascript) as JavaScript code style guide.

**For code contributions:**

1. [Fork this repository](https://github.com/ingenieriasapco/mobi-app).
2. Clone your forked repository ```git@github.com:YOUR_GITHUB_USER/mobi-app.git```.
3. We use [git-flow](http://danielkummer.github.io/git-flow-cheatsheet/) and we highly recommend you to install and use it to make the workflow easier.
4. Create a branch for the feature you will work in. If you have installed git-flow you can use the command ```git flow feature start your-feature-name```.
5. Upload the feature branch to your forked repository. If you have installed git-flow you can use the command ```git flow feature publish your-feature-name```.
6. Send a pull request to **develop** with your branch name. (If you does not know how to send a pull request, please [read this](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)).

**Guidelines:**
* If your code will perform asynchronous operations it must use async/await
* Every bug should be registered as an issue
* Your code should be almost entirely written in english
* Your code should follow the [airbnb-javascript](https://github.com/airbnb/javascript) style guide
* Your commits should be written in english, they must be descriptive and minimalist
* You should try to use testing in your code, but this is not required

**_Note:_** Your code could be rejected by breaking the above rules.
