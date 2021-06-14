import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

import "./styles.css";

async function handleClick() {
  let url = "https://randomuser.me/api/1.3/?results=10";
  let response = await fetch(url);
  let json = await response.json();
  let results = json.results;
  return results;
}

function App() {
  return (
    <div>
      <Button label="Сделать запрос" onClick={() => handleClick()} />
    </div>
  );
}

const main = document.getElementById("root");
ReactDOM.render(<App />, main);
