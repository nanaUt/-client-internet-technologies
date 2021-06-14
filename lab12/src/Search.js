import React from "react";
import BestMatches from "./BestMatches";
import MoreStars from "./MoreStars";
import FewestStars from "./FewestStars";
import MostForks from "./MostForks";
import FewestForks from "./FewestForks";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "",
      perPage: 10,
      text: "",
      page: 1,
      pages: 1,
      action: "no",
      visible: "non-visible",
      pagesArr: []
    };
  }

  search() {
    let text = document.getElementById("search-text").value;
    text = text.trim();
    if (text !== "") {
      let perPage = +document.getElementById("per_page").value;
      let sort = document.getElementById("sort-items").value;
      let pages = Math.ceil(100 / perPage);
      let pagesArr = new Array(pages);
      for (let i = 0; i < pages; i++) pagesArr[i] = i + 1;

      this.setState(
        () => {
          return {
            text: text,
            perPage: perPage,
            sort: sort,
            pages: pages,
            page: 1,
            action: "no",
            visible: "visible",
            pagesArr: pagesArr
          };
        },
        () => this.changeActivePage()
      );
    }
  }

  pageUp() {
    if (this.state.page !== this.state.pages)
      this.setState(
        (prevState) => {
          return { action: "next", page: prevState.page + 1 };
        },
        () => this.changeActivePage()
      );
  }

  pageDown() {
    if (this.state.page !== 1)
      this.setState(
        (prevState) => {
          return { action: "prev", page: prevState.page - 1 };
        },
        () => {
          this.changeActivePage();
        }
      );
  }

  changeActivePage() {
    let pages = document.getElementsByClassName("page");

    for (let i = 0; i < pages.length; i++) {
      if (this.state.page === +pages[i].innerText) {
        pages[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
      }
    }
  }

  render() {
    return (
      <div id="search-form">
        <h3>Поиск репозиториев</h3>
        <div id="search">
          <select id="sort-items" onChange={() => this.changeSort()}>
            <option value="best-match">Лучшие</option>
            <option value="sort:stars-desc">Больше звезд</option>
            <option value="sort:stars-asc">Меньше звезд</option>
            <option value="sort:forks-desc">Больше копий</option>
            <option value="sort:forks-asc">Меньше копий</option>
          </select>
          <div id="search-start">
            <input type="text" id="search-text" />
            <button id="search-btn" onClick={() => this.search()}>
              Поиск
            </button>
          </div>
        </div>
        <div id="settings">
          <p>Выводить репозиториев:</p>
          <input
            type="number"
            min="1"
            defaultValue="10"
            max="100"
            id="per_page"
          />
        </div>
        {this.state.sort === "best-match" ? (
          <BestMatches
            action={this.state.action}
            text={this.state.text}
            count={this.state.perPage}
          />
        ) : this.state.sort === "sort:stars-desc" ? (
          <MoreStars
            action={this.state.action}
            text={this.state.text}
            count={this.state.perPage}
            sort={this.state.sort}
          />
        ) : this.state.sort === "sort:stars-asc" ? (
          <FewestStars
            action={this.state.action}
            text={this.state.text}
            count={this.state.perPage}
            sort={this.state.sort}
          />
        ) : this.state.sort === "sort:forks-desc" ? (
          <MostForks
            action={this.state.action}
            text={this.state.text}
            count={this.state.perPage}
            sort={this.state.sort}
          />
        ) : this.state.sort === "sort:forks-asc" ? (
          <FewestForks
            action={this.state.action}
            text={this.state.text}
            count={this.state.perPage}
            sort={this.state.sort}
          />
        ) : (
          <div />
        )}
        <div id="pagination" className={this.state.visible}>
          <button
            id="prev"
            onClick={() => {
              this.pageDown();
            }}
          >
            ◄
          </button>
          <div id="pages">
            {this.state.pagesArr.map((page) => {
              return <div className="page">{page}</div>;
            })}
          </div>
          <button
            id="next"
            onClick={() => {
              this.pageUp();
            }}
          >
            {" "}
            ►
          </button>
        </div>
      </div>
    );
  }
}
