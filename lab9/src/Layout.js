import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import SignInPage from "./SignInPage";

export default class Layout extends React.Component {
  render() {
    return (
      <div id="layout">
        <Header />
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/sign-in">
          <SignInPage />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
      </div>
    );
  }
}
