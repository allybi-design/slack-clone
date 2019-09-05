import React, { Component } from "react";
// import MainComp from "./components/MainWindow.jsx";
// import SideMenu from "./components/SideMenu";
import UsernameForm from "./components/UsernameForm.jsx";
import ChatScreen from "./components/ChatScreen.jsx";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: "",
      currentScreen: "WhatIsYourUsernameScreen"
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(username) {
    fetch("http://localhost:8000/users", {
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
   
        if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
          return <UsernameForm onSubmit={this.onUsernameSubmitted} />
        }
        if (this.state.currentScreen === 'ChatScreen') {
          return <ChatScreen currentUsername={this.state.currentUsername} />
        }
        

  }
}

{/* <SideMenu />
<MainComp /> */}