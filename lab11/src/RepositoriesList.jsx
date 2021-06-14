import React from "react";
import RepositoriesCard from "./RepositoriesCard";

const RepositoriesList = (props) => {
  return (
    <div className="RepositoriesList">
      {props.data.map((repo, index) => {
        if (index >= props.first && index <= props.last) {
          return (
            <div>
              <RepositoriesCard
                key={index}
                avatar={repo.owner.avatar_url}
                login={repo.owner.login}
                url={repo.html_url}
                name={repo.name}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default RepositoriesList;
