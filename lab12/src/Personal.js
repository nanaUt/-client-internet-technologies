import React from "react";
import Repos from "./PersonalRepos";

export default class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  auth() {
    let token = document.getElementById("input-token").value;
    localStorage.setItem("token", token);
    window.location.reload();
  }
  render() {
    return (
      <div>
        <div id="form">
          <input id="input-token" placeholder="Введите токен" />
          <button
            onClick={() => {
              this.auth();
            }}
          >
            Войти
          </button>
        </div>

        <Repos />
      </div>
    );
  }
}
