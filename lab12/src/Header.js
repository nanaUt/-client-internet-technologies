import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div id="nav">
        <ul>
          <li>
            <Link to="/">Токен</Link>
          </li>
          <li>
            <Link to="/search">Репозитории</Link>
          </li>
        </ul>
      </div>
    );
  }
}
