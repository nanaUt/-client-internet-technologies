import React from "react";
import { Redirect } from "react-router";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getLogin() {
    return localStorage.getItem("login");
  }

  getPassword() {
    return localStorage.getItem("password");
  }

  render() {
    return (
      <div id="profile">
        {this.getLogin() === null ? <Redirect to="/sign-in" /> : ""}
        <h3>Profile</h3>
        <br />
        <div>
          <p>
            <strong>Login:</strong> {this.getLogin()}{" "}
          </p>
        </div>
        <div>
          <p>
            <strong>Password:</strong> {this.getPassword()}{" "}
          </p>
        </div>
        <br />
        <button
          onClick={() => {
            localStorage.clear();
            this.setState(() => {
              return {};
            });
          }}
        >
          Sign out
        </button>
      </div>
    );
  }
}
