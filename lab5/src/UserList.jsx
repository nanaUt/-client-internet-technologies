import React from "react";
import UserCard from "./UserCard";

export default function UserList(props) {
  return (
    <div id="users">
      {props.users.map((user, key) => {
        return <UserCard user={user} key={key} />;
      })}
    </div>
  );
}
