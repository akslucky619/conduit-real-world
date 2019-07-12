import React from "react";
import Header from "./Header";

class Profile extends React.Component {
  state = {
    user: null,
    articles: []
  };

  componentDidMount = () => {
    const data = {
      user: this.state
    };
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
    console.log(this.state, "chechp");
    return (
      <>
        <Header />
        <section className="hero is-small is-success is-bold">
          <div className="hero-body">
            <div className="container hero-container">
              {/* {this.state}?(
              <h1 className="title is-1">{this.state.user.username}</h1>): */}
              <h2 className="subtitle is-4">Edit</h2>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Profile;
