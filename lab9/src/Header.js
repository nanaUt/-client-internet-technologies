import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <ul id="nav">
        <li>
          <Link to="/">Home page</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/profile">My profile</Link>
        </li>
      </ul>
    );
  }
}
