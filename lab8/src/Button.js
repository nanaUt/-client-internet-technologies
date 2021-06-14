import React from "react";
import UserList from "./UserList";
import Preloader from "./Preloader";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      visibility: "not-visible"
    };
  }

  updateUsers() {
    this.setState(() => {
      return { visibility: "visible" };
    });

    let users = this.props.onClick();

    users.then((response) => {
      this.setState(() => {
        return { users: response, visibility: "not-visible" };
      });
    });
  }

  render() {
    return (
      <div id="user-list-wrapper">
        <button id="get-users" onClick={() => this.updateUsers()}>
          {this.props.label}
        </button>
        <Preloader visibility={this.state.visibility} />
        <UserList users={this.state.users} />
      </div>
    );
  }
}
