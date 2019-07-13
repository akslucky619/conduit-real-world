import React from "react";
import { Link } from "react-router-dom";

class SingleArt extends React.Component {
  state = {
    article: {},
    comments: {}
  };

  componentDidMount = () => {
    const { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(({ article }) => {
        console.log(article, "lodu");
        this.setState({ article: article });
      });
    fetch(
      `https://conduit.productionready.io/api/articles/${slug}/comments
      `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(comments => {
        console.log(comments, "inside comments");
        this.setState({ comments: comments.comments });
      });
  };

  render() {
    const { article } = this.state;
    console.log(article, "check rt");
    return (
      <>
        {Object.keys(article).length ? (
          <>
            <section className="hero is-small is-success is-bold">
              <div className="hero-body">
                <div className="container hero-container">
                  <h1 className="title is-1">{this.state.article.title}</h1>
                  <Link to="/profile" className="subtitle is-6">
                    {}
                  </Link>
                </div>
              </div>
            </section>
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48" />
                    {/* <img /> */}
                    <h2>{article.author.username}</h2>
                  </div>
                  <div class="media-content">
                    <p class="title is-4" />
                  </div>
                </div>
                <div class="content">
                  <br />
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* {this.state.comments.comments.map((comment, i) => {
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Component</p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fas fa-angle-down" aria-hidden="true" />
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <br />
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">
                Save
              </a>
              <a href="#" class="card-footer-item">
                Edit
              </a>
              <a href="#" class="card-footer-item">
                Delete
              </a>
            </footer>
          </div>;
        })} */}
      </>
    );
  }
}

export default SingleArt;
