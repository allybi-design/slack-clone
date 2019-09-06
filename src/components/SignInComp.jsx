import React, { Component } from "react";

import "../styles/signIn.css"

export default class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div id="signIn">
        <h2>Please log in with usernane?</h2>
        <form className="signInElement"onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Your full name"
            onChange={this.onChange}
            
          />
          <button type="submit" >Submit</button>
        </form>
      </div>
    );
  }
}


