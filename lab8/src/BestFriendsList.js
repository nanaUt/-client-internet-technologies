import React from "react";
import { store } from "./index";
import BestFriendCard from "./BestFriendCard";

export default class BestFriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  setFriends() {
    store.subscribe(() => {
      this.setState(() => {
        return { friends: store.getState() };
      });
    });
  }

  i = 0;
  render() {
    return (
      <div id="friends-list">
        {this.setFriends()}
        {this.state.friends.map((friend) => {
          this.i++;
          return <BestFriendCard friend={friend} key={this.i} />;
        })}
      </div>
    );
  }
}
