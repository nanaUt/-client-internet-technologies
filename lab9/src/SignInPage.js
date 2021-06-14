import React from "react";

export default class SignInPage extends React.Component {
  signIn() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    let userLogin = localStorage.getItem("login");
    let userPassword = localStorage.getItem("password");

    if (login === "") alert("Enter a login");
    else if (password === "") alert("Enter a password");
    else if (userLogin === null && userPassword === null) {
      localStorage.setItem("login", login);
      localStorage.setItem("password", password);
      alert("You are sign in");
    } else alert("You are already sign in");
  }

  render() {
    return (
      <div id="sign-form">
        <h3>Sign In</h3>
        <br />
        <label>Login</label>
        <br />
        <input type="text" id="login" />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input type="password" id="password" />
        <br />
        <br />
        <button onClick={() => this.signIn()} id="sign-in">
          Sign in
        </button>
      </div>
    );
  }
}
