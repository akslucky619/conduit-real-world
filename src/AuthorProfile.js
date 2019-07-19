import React from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";
import { ArticleLike } from "./Stories";


class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      articles: []
    };
  }

  componentDidMount = () => {
    const user = this.props.location.state.username;
    fetch(`https://conduit.productionready.io/api/profiles/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(singleuser => {
        console.log(singleuser, "in authorpro");
        this.setState({
          user: singleuser.profile
        });
        fetch(
          `https://conduit.productionready.io/api/articles?author=${user}&limit=5&offset=0`,
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
            console.log(articles, "in authore");
            this.setState({
              articles: articles.articles
            });
          });
      });
  };

  render() {
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
                          <figure
                            // style={{ "margin-left": "535px" }}
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
        {/* <section className="hero is-small is-light is-bold">
          <div className="base column is-8 is-offset-2">
         
            <div className="hero-body">
              <div className="container hero-container">
              
                <div>
                  <figure className="image is-128x128 img-container">
                    <img
                      className=" is-responsive image is-rounded"
                      src={
                        this.state.user.image ||
                        "https://bulma.io/images/placeholders/128x128.png"
                      }
                      alt="profile avatar"
                    />
                  </figure>
                  <h4 className="title is-4">{this.state.user.username}</h4>
                  <p className="profile-bio is-6">{this.state.user.bio}</p>
                </div>
              </div>
            </div>
            <div className="hero-bottom">
              {this.state.user.username === localStorage.user.username ? (
                <button
                  className="profile-btn button is-outlined"
                  onClick={this.editProfile}
                >
                  <span className="icon">
                    <i className="fas fa-cog" />
                  </span>
                  <span>Edit Profile Settings</span>
                </button>
              ) : (
                <FollowButton profile={profile} />
              )}
            </div>
          </div>
        </section> */}
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
export default AuthorProfile;
