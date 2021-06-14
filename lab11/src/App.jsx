import React from "react";
import axios from "axios";
import RepositoriesList from "./RepositoriesList";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      pages: 1,
      first: 0,
      last: 9,
      pagination: "not-display"
    };
  }

  arrPages = [];
  pagesInit(length) {
    for (let i = 0; i < length; i++) this.arrPages[i] = i;
  }

  search() {
    let text = document.getElementById("search-text").value;

    if (text !== "") {
      let sort = document.getElementById("sort-item").value;
      let url = "https://api.github.com/search/repositories?q=" + text;

      if (sort === "stars") url += "&sort=" + sort;

      if (sort === "forks") url += "&sort=" + sort;

      if (sort === "followers") url += "&sort=" + sort;

      axios(url)
        .then((response) => {
          if (response.data.items.length !== 0)
            this.setState(() => {
              return {
                data: response.data.items,
                page: 1,
                pages: 3,
                first: 0,
                last: 9,
                pagination: "display"
              };
            });
          else alert("Not found");
        })
        .catch((error) => {
          alert("Error");
        });
    }
  }

  changeActivePage() {
    let pages = document.getElementsByClassName("pages");

    for (let i = 0; i < pages.length; i++) {
      let pageNumber = +pages[i].textContent;
      if (pageNumber === this.state.page)
        pages[i].classList.toggle("active-page");
    }
  }

  clearActivePage() {
    let pages = document.getElementsByClassName("pages");

    for (let i = 0; i < pages.length; i++)
      pages[i].classList.remove("active-page");
  }

  nextPage() {
    this.setState((prevState) => {
      if (
        this.state.page < this.state.pages &&
        this.state.page >= 1 &&
        this.state.data.length !== 0
      )
        return {
          page: prevState.page + 1,
          first: prevState.first + 10,
          last: prevState.last + 10
        };
      else if (
        this.state.page === this.state.pages &&
        this.state.data.length !== 0
      )
        return { page: 1, first: 0, last: 9 };
    });
    this.changeActivePage();
  }

  previousPage() {
    this.setState((prevState) => {
      if (
        this.state.page <= this.state.pages &&
        this.state.page > 1 &&
        this.state.data.length !== 0
      )
        return {
          page: prevState.page - 1,
          first: prevState.first - 10,
          last: prevState.last - 10
        };
      else if (this.state.page === 1 && this.state.data.length !== 0)
        return {
          page: this.state.pages,
          first: (this.state.pages - 1) * 10,
          last: this.state.pages * 10 - 1
        };
    });
    this.changeActivePage();
  }

  render() {
    return (
      <div className="App">
        {this.pagesInit(10)}

        <select id="sort-item">
          <option value="followers">Followers</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>

        <input type="text" id="search-text" placeholder="Enter here" />

        <button type="button" onClick={() => this.search()}>
          Поиск
        </button>
        <RepositoriesList
          data={this.state.data}
          first={this.state.first}
          last={this.state.last}
        />
        <div id={this.state.pagination}>
          <button type="button" id="prev" onClick={() => this.previousPage()}>
            Back
          </button>
          {this.arrPages.map((index) => {
            if (index < this.state.pages)
              return (
                <div className="pages" key={index} id={index + 1}>
                  {index + 1}
                </div>
              );
          })}
          <button type="button" id="next" onClick={() => this.nextPage()}>
            Next
          </button>
        </div>
        {this.clearActivePage()}
        {this.changeActivePage()}
      </div>
    );
  }
}

export default App;
