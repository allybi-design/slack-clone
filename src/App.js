import React, { Component } from "react";
import SignIn from "./components/SignInComp.jsx";
import MainComp from "./components/MainComp.jsx";

import "./styles/reset.css"

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: "alison",
      currentScreen: "signInScreen"
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: "ChatScreen"
        });
      })
      .catch(error => console.error("error", error));
  }

  render() {
        if (this.state.currentScreen === 'signInScreen') {
          return <SignIn onSubmit={this.onUsernameSubmitted} />
        }
        if (this.state.currentScreen === 'ChatScreen') {
          return <MainComp currentUsername={this.state.currentUsername} />
        }
  }
}