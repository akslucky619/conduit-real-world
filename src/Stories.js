import React from "react";
import "bulma";
import "./styles.css";

// import axios from "axios";
import { Link } from "react-router-dom";
import customFetch from "../customFetch";
import Pagination from "./Pagination";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      isLoading: false,
      tag: "",
      articlesCount: 0,
      page: 1,
      initailTab: "globalFeed"
    };
    this.isYourFeed = false;
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = (filter = {}) => {
    const { tag, author, favorited, offset } = filter;

    if (!this.isYourFeed) {
      const URL = `https://conduit.productionready.io/api/articles?limit=10&offset=${offset ||
        "0"}&tag=${tag || ""}&author=${author || ""}&favorited=${favorited ||
        ""}`;

      fetch(URL)
        .then(res => res.json())
        .then(data => {
          const { articles, articlesCount } = data;
          this.setState({ articles, articlesCount, isLoading: false });
        })
        .catch(error => console.error(error));
    } else {
      const URL = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${offset ||
        "0"}`;
      const token = `Token ${localStorage.token}`;

      fetch(URL, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // no-referrer, *client
      })
        .then(response => response.json())
        .then(data => {
          const { articles, articlesCount } = data;
          this.setState({ articles, articlesCount, isLoading: false });
        })
        .catch(error => console.error(error));
    }
  };

  filterByItem = item => {
    this.isYourFeed = false;
    this.fetchArticles(item);
  };

  setPage = page => {
    this.setState({ page });
  };

  setTag = tag => {
    this.setState({ tag, initailTab: "tagFeed", isYourFeed: false });
  };

  // handleTab = tab => {
  //   this.setState({ initailTab: tab });
  //   switch (tab) {
  //     case "yourFeed":
  //       this.isYourFeed = true;
  //       this.fetchArticles();
  //       break;
  //     case "globalFeed":
  //       this.filterByItem();
  //       break;
  //     case "tagFeed":
  //       this.filterByItem({ tag: this.state.tag });
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // componentDidMount() {
  //   const url = `https://conduit.productionready.io/api/articles?offset=0`;
  //   axios.get(url).then(res => {
  //     const stories = res.data;
  //     console.log(stories, "in home");
  //     this.setState({
  //       articles: stories.articles,
  //       storiesCount: stories.articlesCount
  //     });
  //   });
  // }

  render() {
    const {
      // articles,
      // isLoading,
      page,
      // tag,
      articlesCount
      // initailTab
    } = this.state;
    return (
      <>
        <ul>
          {this.state.articles.map((article, i) => (
            <article
              style={{ "margin-bottom": "50px" }}
              className="media"
              key={i}
            >
              <figure className="media-left">
                <p className="image is-64x64">
                  <img
                    className=" is-responsive is-rounded"
                    src={article.author.image}
                    alt=""
                  />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <div>
                    <span>
                      <Link
                        to={{
                          pathname: "/authorProfile",
                          state: {
                            username: article.author.username
                          }
                        }}
                        className=""
                      >
                        {article.author.username}
                      </Link>
                    </span>
                    <p className="">
                      <em>{Date(article.updatedAt).slice(0, 15)}</em>
                    </p>
                  </div>
                </div>
                <Link to={`/article/${article.slug}`} className="article-link">
                  <div className="">
                    <h4 className="">{article.title}</h4>
                    <p>
                      {article.description.length > 70
                        ? `${article.description.slice(0, 70)}...`
                        : article.description}
                    </p>
                  </div>
                  <small className="">Read More...</small>
                </Link>
              </div>
              <div className="media-right">
                <ArticleLike article={article} />
              </div>
            </article>
          ))}
        </ul>
        {/* <Pagination i={this.state.storiesCount} /> */}
        <Pagination
          count={articlesCount}
          filterByPage={this.fetchArticles}
          setPage={this.setPage}
          page={page}
        />
      </>
    );
  }
}

class ArticleLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.article.favoritesCount,
      fav: props.article.favorited
    };
  }

  clickLike(slug, fav) {
    const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    const mode = this.state.fav ? "DELETE" : "POST";
    const token = `Token ${localStorage.token}`;

    customFetch(url, null, token, mode)
      .then(data => {
        if (!data.errors) {
          const { favoritesCount, favorited } = data.article;
          this.setState({ likes: favoritesCount, fav: favorited });
        } else {
          this.setState({ message: "email or password is invalid" });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { slug, favorited } = this.props.article;
    return (
      <button
        onClick={() => this.clickLike(slug, favorited)}
        className="button is-success is-outlined"
      >
        <span className="icon is-small">
          <i class="far fa-thumbs-up" />
        </span>
        <span>{this.state.likes}</span>
      </button>
    );
  }
}

// to={`/article/${article.slug}`}
