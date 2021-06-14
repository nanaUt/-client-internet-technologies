import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import { createStore } from "redux";
import BestFriendsList from "./BestFriendsList";

import "./styles.css";
export { store };

async function getUsers() {
  let url =
    "https://randomuser.me/api/1.3/?results=10&inc=gender,name,location,email,dob,phone,picture";
  let response = await fetch(url);
  let json = await response.json();
  let results = json.results;
  return results;
}

function changeBest(action) {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].getElementsByTagName("h2")[0].textContent;
    if (title === action.name) cards[i].classList.toggle("best");
  }
}

function BestFriends(state = [], action) {
  if (action.type === "ADD_FRIEND") {
    let hasFriend = false;

    state.map((friend) => {
      if (friend === action.name) {
        hasFriend = true;
      }
    });

    if (hasFriend === false) {
      changeBest(action);
      return [...state, action.name];
    }
  }
  if (action.type === "REMOVE_FRIEND") {
    let index = state.indexOf(action.name);
    if (index > -1) {
      state.splice(index, 1);
      changeBest(action);
    }
  }
  return state;
}

let store = createStore(BestFriends);

function App() {
  return (
    <div>
      <div id="info-friends-title">best friends</div>
      <BestFriendsList />
      <div id="info-title">let's go</div>
      <Button label="click here" onClick={() => getUsers()} store={store} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
