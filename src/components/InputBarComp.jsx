import React, { Component } from "react";

export default class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Messaage #general"
          onChange={this.onChange}
          value={this.state.text}
        />
        <i className="fas fa-at"></i>
        <i className="far fa-grin"></i>
      </form>
    );
  }
}
