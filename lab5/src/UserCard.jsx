import React from "react";
import UserAvatar from "./UserAvatar";

export default function UserCard({ user }) {
  return (
    <div className="card">
      <UserAvatar width="299px" height="299px" src={user.picture.large} />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {user.name.title} {user.name.first} {user.name.last}
        </li>
        <li className="list-group-item">{user.gender}</li>
        <li className="list-group-item">
          {user.location.country} {user.location.city}{" "}
          {user.location.street.name}
          {user.location.street.number}
        </li>
        <li className="list-group-item">{user.email}</li>
        <li className="list-group-item">
          {user.dob.date.slice(0, 10) + "\t age: " + user.dob.age}
        </li>
        <li className="list-group-item">{user.phone}</li>
      </ul>
    </div>
  );
}
