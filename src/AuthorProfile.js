import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

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
                      <p className="profile-bio is-6">{this.state.user.bio}</p>
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
export default AuthorProfile;
