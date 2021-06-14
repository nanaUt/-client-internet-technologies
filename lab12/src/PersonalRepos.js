import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const reposQuery = gql`
  query {
    viewer {
      id
      login
      repositories(first: 100) {
        nodes {
          id
          name
          url
        }
      }
    }
  }
`;
const Repos = () => (
  <Query query={reposQuery}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <div>
            <img
              src="https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif"
              alt="preloader"
            />
          </div>
        );
      if (error)
        return <h3 id="error">Вы не авторизированы, введите access token</h3>;

      return (
        <div id="personal-repos">
          <h3>Вы вошли как {data.viewer.login}, ваши репозитории:</h3>
          {data.viewer.repositories.nodes.map((repo) => {
            return (
              <div className="repo-wrapper" key={repo.id}>
                <h4>{repo.name}</h4>
                <a className="personal-url" href={repo.url}>
                  {repo.url}
                </a>
                <br />
                <div>
                  <Link to={"/repo/" + repo.name}>Смотреть</Link>
                </div>
              </div>
            );
          })}
        </div>
      );
    }}
  </Query>
);

export default Repos;
