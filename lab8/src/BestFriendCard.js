import React from "react";
import RemoveButton from "./RemoveButton";
import { store } from "./index";

export default class BestFriendCard extends React.Component {
  removeFriend() {
    store.dispatch({ type: "REMOVE_FRIEND", name: this.props.friend });
  }

  render() {
    return (
      <div className="friend">
        <h3>{this.props.friend}</h3>
        <RemoveButton onClick={() => this.removeFriend()} label="delete" />
      </div>
    );
  }
}
