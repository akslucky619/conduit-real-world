import React from "react";
import Header from "./Header";
import { Link, NavLink } from "react-router-dom";

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
                  <div className="hero-bottom">
                    <Link to="/edit">
                      <button className="profile-btn button is-outlined">
                        <span className="icon">
                          <i className="fas fa-cog" />
                        </span>
                        <span>Edit Profile Settings</span>
                      </button>
                    </Link>
                  </div>
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
                <div class="column is-half is-offset-one-quarter">
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <img
                              className="is-rounded"
                              src={article.author.image}
                              alt=""
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">
                            {article.author.username}
                          </p>
                          <Link
                            to={`/article/${article.slug}`}
                            className="subtitle is-6"
                          >
                            {article.title}
                          </Link>
                        </div>
                      </div>
                      <div className="content">
                        {article.description}
                        <br />
                        <time dateTime="2016-1-1">{article.createdAt}</time>
                      </div>
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
