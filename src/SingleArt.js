import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
// import CommentPost from "./CommentPost";

class SingleArt extends React.Component {
  state = {
    article: {},
    comments: [],
    body: ""
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
        console.log(article, "in single art");
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
        console.log(comments.comments, "inside comments");
        this.setState({ comments: comments.comments });
      });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  postComent = () => {
    const data = {
      comment: {
        body: this.state.body
      }
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
      .then(({ comment }) => {
        this.setState({
          comments: [...this.state.comments, comment]
        });
      });
    this.setState({
      body: ""
    });
  };

  handleDelete = () => {};
  render() {
    const { article, comments, body } = this.state;
    console.log(body, "check body");
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
        <section className="column is-6 is-offset-3">
          <article class="media">
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea
                    class="textarea"
                    onChange={this.handleChange}
                    name="body"
                    placeholder="Add a comment..."
                  >
                    {body}
                  </textarea>
                </p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <button class="button is-info" onClick={this.postComent}>
                      Submit
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </section>
        <section className="column is-6 is-offset-3">
          {comments
            ? comments.reverse().map((comment, i) => (
                <article key={i} className="media comment-box">
                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea
                          className="textarea old-comment"
                          value={comment.body}
                          placeholder="Add a comment..."
                          rows="3"
                          readOnly
                        />
                      </p>
                    </div>
                    <nav className="level comment-footer">
                      <div className="level-left">
                        <div className="media commnet-media">
                          <div className="media-left">
                            <figure className="image is-32x32">
                              <img
                                className=" is-responsive is-rounded"
                                src={
                                  comment.author.image ||
                                  "https://bulma.io/images/placeholders/96x96.png"
                                }
                                alt="author avatar"
                              />
                            </figure>
                          </div>
                          <div className="v-center media-content is-small">
                            <Link
                              to={{
                                pathname: "/profile",
                                state: {
                                  username: comment.author.username
                                }
                              }}
                              className="green-text"
                            >
                              <span className="green-text">
                                {comment.author.username}
                              </span>
                            </Link>
                            <span className="thin-text">
                              <em>{Date(comment.createdAt).slice(0, 15)}</em>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* {comment.author.username === currentUser ? (
                      <div className="level-right">
                        <div className="level-item">
                          <div className="level-item">
                            <button
                              className="button is-text"
                              onClick={() => this.deleteCommnt(id)}
                            >
                              <span className="icon is-small">
                                <i className="fas fa-trash-alt" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )} */}
                    </nav>
                  </div>
                </article>
              ))
            : ""}
        </section>
      </>
    );
  }
}

export default SingleArt;
