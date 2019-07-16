import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
// import CommentPost from "./CommentPost";

class SingleArt extends React.Component {
  state = {
    article: {},
    comments: {},
    comment: {
      body: []
    }
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

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    const data = {
      comment: this.state
    };
    const { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(comment => {
        console.log(comment);
      });
  };

  render() {
    const { article, comments } = this.state;
    console.log(comments, "just checking");
    console.log(article, "check rt");
    return (
      <>
        <Header />
        {Object.keys(article).length ? (
          <>
            <section className="hero is-small is-success is-bold">
              <div className="hero-body">
                <div className="container hero-container">
                  <h1 className="title is-1">{this.state.article.title}</h1>
                  <h3>By..</h3>
                  <Link to="/profile" className="subtitle is-6">
                    {article.author.username}
                  </Link>
                  <Link to={`/editArticle/${article.slug}`}>Edit</Link>
                </div>
              </div>
            </section>
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48" />
                    {/* <img /> */}
                    <h2>{article.body}</h2>
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
        {/* {comments!== null?(
          <>
        )} */}
        {/* {comments.map((comment, i) => {
          <p>{comment.body}</p>;
        })} */}
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea
                  class="textarea"
                  onChange={this.handleChange}
                  name="body"
                  placeholder="Add a comment..."
                />
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <button class="button is-info" onClick={this.handleClick}>
                    Submit
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </>
    );
  }
}

export default SingleArt;
