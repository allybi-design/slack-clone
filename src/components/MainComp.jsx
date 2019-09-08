import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";

//components

import InputBarComp from "./InputBarComp.jsx";
import TypingIndicator from "./TypingIndicator.jsx";
import CurrentUsersComp from "./CurrentUsersComp.jsx";

import "../styles/mainComp.css";

export default class mainWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      roomIDs: [
        { name: "general", key: "6d0e3431-2b2b-41ba-9756-37d86d99581c" },
        { name: "development", key: "76176a7c-efbf-4d14-842c-40f10f9e69d2" },
        { name: "random", key: "5ca95e51-3d94-4fff-9d03-7ed6894491c6" }
      ]
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "Yv1:us1:8b02d032-1a3e-49ca-b6b2-a11cfa99f3f0",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://slack-clone-server-allybi.herokuapp.com/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: "6d0e3431-2b2b-41ba-9756-37d86d99581c",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error("error", error));
  }

  timePosted(date) {
    let d = new Date(date);
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    return `${h}:${m}:${s}`;
  }

  render() {
    const revMessages = this.state.messages.reverse();
    const messages = revMessages.map((message, index) => (
      <li key={index} className="post">
        <div className="avatar">
          <i className="fas fa-user fa-2x"></i>
        </div>
        <div className="message">
          <span className="userName">{message.senderId}</span>
          <span className="dateTime">{this.timePosted(message.createdAt)}</span>
          <p>{message.text}</p>
        </div>
      </li>
    ));

    return (
      <div id="mainPage">
        <aside className="sideBar">
          <div className="header">
            <h4>
              <b>Master Coding 8</b>
              <i className="fas fa-angle-down"></i>
              <i className="far fa-bell"></i>
            </h4>
          </div>
          <div className="channels">
            <h5>
              Channels
              <i className="fas fa-plus-circle"></i>
            </h5>
            <ul>
              <li># development</li>
              <li>
                <b># general</b>
              </li>
              <li># random</li>
            </ul>
          </div>
          <div className="users">
            <h5>
              Direct Message
              <i className="fas fa-plus-circle"></i>
            </h5>
            <CurrentUsersComp
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </div>
        </aside>

        <main className="mainPanel">
          <nav className="navbar">
            <div>
              <i className="fab fa-slack-hash"></i>
              <b> general </b>
            </div>

            <div>
              <i className="fas fa-info-circle"></i>
              <i className="fas fa-cog"></i>
              <input type="text" placeholder=" Search" />
              <i className="fas fa-at"></i>
              <i className="far fa-star"></i>
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </nav>

          <ul id="messageList" className="posts">
            {messages}
          </ul>

          <div className="inputBar">
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <InputBarComp
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </div>
        </main>
      </div>
    );
  }
}
