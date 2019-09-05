import React, { Component } from "react";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="sidemenu">
        <div className="header">
          <h4>
            <b>Master Coding 8</b>
            <i className="fas fa-caret-down"></i>
          </h4>
          <i class="fas fa-bell"></i>
        </div>
      </div>
    );
  }
}
