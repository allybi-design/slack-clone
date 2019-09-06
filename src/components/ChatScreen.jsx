import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";

//components
import MessageList from "./MessageList.jsx";
import SendMessageForm from "./SendMessageForm.jsx";
import TypingIndicator from "./TypingIndicator.jsx";
import WhosOnlineList from "./WhosOnlineList.jsx";

class ChatScreen extends Component {
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
        url: "http://localhost:3001/authenticate"
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

  render() {
    const styles = {
      container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      chatContainer: {
        display: "flex",
        flex: 1
      },
      whosOnlineListContainer: {
        width: "15%",
        padding: 20,
        backgroundColor: "#2c303b",
        color: "white"
      },
      chatListContainer: {
        padding: 20,
        width: "85%",
        display: "flex",
        flexDirection: "column"
      }
    };

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;

// {
  /* <div id="mainWindow">
  <nav className="navbar">
    <div className="navLogoRoom">
      <i className="fab fa-slack-hash"></i>
      <b>general</b>
    </div>
    <div className="navsearchBar">
      <i className="fas fa-info-circle"></i>
      <i className="fas fa-cog"></i>
      <input type="text" placeholder="&#xf002; Search" />
      <i className="fas fa-at"></i>
      <i className="far fa-star"></i>
      <i className="fas fa-ellipsis-v"></i>
    </div>
  </nav>

  <article className="dailyPosts">
    <div className="posts">
      <section className="post">
        <div className="avatar">
          <i className="fas fa-user fa-2x"></i>
        </div>
        <div className="userTime">
          <b className="userName">Monica </b>
          <small>3.15pm</small>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima
            repellendus cum, libero iusto nobis sed animi eaque rerum impedit.
          </p>
        </div>
      </section>

      <section className="post">
        <div className="avatar ">
          <i className="fas fa-user fa-2x"></i>
        </div>
        <div className="userTime">
          <b className="userName">Alison </b>
          <small>3.20pm</small>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima
            repellendus cum,{" "}
          </p>
        </div>
      </section>

      <section className="post">
        <div className="avatar">
          <i className="fas fa-user fa-2x"></i>
        </div>
        <div className="userTime">
          <b className="userName">Stefan</b>
          <small>3.25pm</small>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </section>
    </div>
  </article>

  <div className="inputBar">
    <input type="text" placeholder="type a message..." />
  </div>
</div>; */
}
