import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const reposQuery = gql`
  query MoreStars($text: String!, $count: Int!) {
    search(query: $text, type: REPOSITORY, first: $count) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            url
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

const nextReposQuery = gql`
  query nextBest($text: String!, $count: Int!, $endCursor: String!) {
    search(query: $text, type: REPOSITORY, first: $count, after: $endCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            url
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

const prevReposQuery = gql`
  query prevBest($text: String!, $count: Int!, $startCursor: String!) {
    search(query: $text, type: REPOSITORY, last: $count, before: $startCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            url
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

export default function MoreStars(props) {
  const text = props.text + " " + props.sort;
  const count = props.count;
  let i = 0;
  if (props.action === "no") {
    const { loading, error, data } = useQuery(reposQuery, {
      variables: { text, count }
    });

    if (loading)
      return (
        <div>
          <img
            src="https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif"
            alt="preloader"
          />
        </div>
      );
    if (error) return <p>Error :(</p>;

    localStorage.setItem("hasNext", data.search.pageInfo.hasNextPage);
    localStorage.setItem("hasPrev", data.search.pageInfo.hasPreviousPage);
    localStorage.setItem("endCursor", data.search.pageInfo.endCursor);
    localStorage.setItem("startCursor", data.search.pageInfo.startCursor);

    const repos = data.search.edges;

    return (
      <div id="best-repos-wrapper">
        <p>
          По запросу "<strong>{text}</strong>"":
        </p>
        <div id="repos">
          {repos.map((repo) => (
            <div key={i++} className="best-repo">
              <img id="avatar" src={repo.node.owner.avatarUrl} alt="avatar" />
              <p>
                Репозиторий: <strong>{repo.node.name}</strong>
              </p>
              <p>
                Владелец: <strong>{repo.node.owner.login}</strong>
              </p>
              <p>
                Ссылка: <a href={repo.node.url}>{repo.node.url}</a>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (
    props.action === "next" &&
    localStorage.getItem("hasNext") === "true"
  ) {
    const endCursor = localStorage.getItem("endCursor");
    const { loading, error, data } = useQuery(nextReposQuery, {
      variables: { text, count, endCursor }
    });

    if (loading)
      return (
        <div>
          <img
            src="https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif"
            alt="preloader"
          />
        </div>
      );
    if (error) return <p>Error :(</p>;

    localStorage.setItem("hasNext", data.search.pageInfo.hasNextPage);
    localStorage.setItem("hasPrev", data.search.pageInfo.hasPreviousPage);
    localStorage.setItem("endCursor", data.search.pageInfo.endCursor);
    localStorage.setItem("startCursor", data.search.pageInfo.startCursor);

    const repos = data.search.edges;

    return (
      <div id="best-repos-wrapper">
        <p>
          По запросу "<strong>{text}</strong>"":
        </p>
        <div id="best-repos">
          {repos.map((repo) => (
            <div key={i++} className="best-repo">
              <img id="avatar" src={repo.node.owner.avatarUrl} alt="avatar" />
              <p>
                Репозиторий: <strong>{repo.node.name}</strong>
              </p>
              <p>
                Владелец: <strong>{repo.node.owner.login}</strong>
              </p>
              <p>
                Ссылка: <a href={repo.node.url}>{repo.node.url}</a>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (
    props.action === "prev" &&
    localStorage.getItem("hasPrev") === "true"
  ) {
    const startCursor = localStorage.getItem("startCursor");

    const { loading, error, data } = useQuery(prevReposQuery, {
      variables: { text, count, startCursor }
    });

    if (loading)
      return (
        <div>
          <img
            src="https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif"
            alt="preloader"
          />
        </div>
      );
    if (error) return <p>Error :(</p>;

    localStorage.setItem("hasNext", data.search.pageInfo.hasNextPage);
    localStorage.setItem("hasPrev", data.search.pageInfo.hasPreviousPage);
    localStorage.setItem("endCursor", data.search.pageInfo.endCursor);
    localStorage.setItem("startCursor", data.search.pageInfo.startCursor);

    const repos = data.search.edges;

    return (
      <div id="best-repos-wrapper">
        <p>
          По запросу "<strong>{text}</strong>"":
        </p>
        <div id="best-repos">
          {repos.map((repo) => (
            <div key={i++} className="best-repo">
              <img id="avatar" src={repo.node.owner.avatarUrl} alt="avatar" />
              <p>
                Репозиторий: <strong>{repo.node.name}</strong>
              </p>
              <p>
                Владелец: <strong>{repo.node.owner.login}</strong>
              </p>
              <p>
                Ссылка: <a href={repo.node.url}>{repo.node.url}</a>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
