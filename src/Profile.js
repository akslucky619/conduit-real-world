import React from "react";
import Header from "./Header";
import { Link, NavLink, Redirect } from "react-router-dom";
import { ArticleLike } from "./Stories";


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
        {localStorage.token ? (
          <>
            <Header />
            <section className="hero is-small is-success is-bold">
              <div className="base column is-8 is-offset-2">
                <div className="hero-body">
                  <div className="container hero-container">
                    {user !== null ? (
                      <>
                        <div>
                          <div>
                            <figure
                              // style={{ "margin-left": "567px" }}
                              className="image is-128x128 img-container"
                            >
                              <img
                                className=" is-responsive image is-rounded"
                                src={
                                  this.state.user.image ||
                                  "https://bulma.io/images/placeholders/128x128.png"
                                }
                                alt="profile avatar"
                              />
                            </figure>
                          </div>
                          <h4
                            // style={{ "padding-top": "3rem" }}
                            className="title is-4"
                          >
                            {this.state.user.username}
                          </h4>
                          <p className="profile-bio is-6">
                            {this.state.user.bio}
                          </p>
                          <div className="hero-bottom">
                            {this.state.user.username ===
                            localStorage.user.username ? (
                              <Link to="/edit">
                                <button className="profile-btn button is-outlined">
                                  <span className="icon">
                                    <i className="fas fa-cog" />
                                  </span>
                                  <span>Edit Profile Settings</span>
                                </button>
                              </Link>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <h1>Load ho raha hai...</h1>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <Redirect to="/login" />
        )}
        {articles !== null ? (
          <>
            <ul style={{ width: "53rem", marginLeft: "32rem", marginTop: "6rem" }}>
              {this.state.articles.map((article,i) => (
                <article
                style={{ marginBottom: "50px" }}
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
                  <Link
                    to={`/article/${article.slug}`}
                    className="article-link"
                  >
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
          </>
        ) : (
          <h1>LOading...</h1>
        )}
      </>
    );
  }
}

export default Profile;
