import React, { Component } from "react";

class WhosOnlineList extends Component {
  renderUsers() {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                <i className="fas fa-circle"></i>{user.name} 
              </WhosOnlineListItem>
            );
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosOnlineListItem>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <p>Loading...</p>;
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    return (
      <li >
        <div style={{
            backgroundColor:
              this.props.presenceState === "online" ? "#539eff" : "#414756"
          }}
        />
        {this.props.children}
      </li>
    );
  }
}

export default WhosOnlineList;
