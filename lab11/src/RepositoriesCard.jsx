import React from "react";

const RepositoriesCard = (props) => {
  return (
    <div className="RepositoriesCard">
      <img className="avatar" src={props.avatar} alt="avatar" />
      <h3>{props.login}</h3>
      <a href={props.url}>{props.name}</a>
    </div>
  );
};

export default RepositoriesCard;
