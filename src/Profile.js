import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  state = {
    user: null,
    articles: []
  };

  componentDidMount = () => {
    fetch("https://conduit.productionready.io/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        this.setState({
          user: user.user
        });
        fetch(
          `https://conduit.productionready.io/api/articles?author=${
            user.user.username
          }&limit=5&offset=0`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.token}`
            }
          }
        )
          .then(res => res.json())
          .then(articles => {
            console.log(articles, "in profile");
            this.setState({
              articles: articles.articles
            });
          });
      });
  };

  render() {
    // console.log(this.state, "chechp");
    const { user, articles } = this.state;
    return (
      <>
        <Header />
        <section className="hero is-small is-success is-bold">
          <div className="hero-body">
            <div className="container hero-container">
              {user !== null ? (
                <>
                  <h1 className="title is-1">{this.state.user.username}</h1>
                  <h2 className="subtitle is-4">Edit</h2>
                </>
              ) : (
                <h1>Load ho raha hai...</h1>
              )}
            </div>
          </div>
        </section>
        {articles !== null ? (
          <>
            <ul>
              {this.state.articles.map(article => (
                <div class="card is-half">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-48x48" />
                        {/* <img src={article.author.image} /> */}
                      </div>
                      <div class="media-content">
                        <p class="title is-4">{article.author.username}</p>
                        <Link
                          to={`/article/${article.slug}`}
                          class="subtitle is-6"
                        >
                          {article.title}
                        </Link>
                      </div>
                    </div>
                    <div class="content">
                      {article.description}
                      <br />
                      <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </>
        ) : (
          <h1>LOading...</h1>
        )}
      </>
    );
  }
}

export default Profile;
