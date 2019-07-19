import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
// import CommentPost from "./CommentPost";

class SingleArt extends React.Component {
  state = {
    article: {},
    comments: [],
    body: "",
    user: ""
  };

  componentDidMount = () => {
    const { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Token ${localStorage.token}`
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
          "Content-Type": "application/json"
          // Authorization: `Token ${localStorage.token}`
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

  handleDelete = commentID => {
    const { slug } = this.props.match.params;
    fetch(
      `https://conduit.productionready.io/api/articles/${slug}/comments/${commentID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(comment => {
        console.log(comment, "in delete");
        const deletedItems = this.state.comments.filter(
          comment => comment.id !== commentID
        );
        console.log(deletedItems, "check deleteitem");
        this.setState({
          comments: deletedItems
        });
      });
  };
  render() {
    const { article, comments, body } = this.state;
    console.log(article, "check artcle wala author");
    const user = JSON.parse(localStorage.user);
    console.log(comments, "check cmments");
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
                  <h2>
                    <Link
                      to={{
                        pathname: "/authorProfile",
                        state: {
                          username: this.state.article.author.username
                        }
                      }}
                      className="subtitle is-6"
                    >
                      {article.author.username}
                    </Link>
                  </h2>
                  {article.author.username === user.username ? (
                    <Link to={`/editArticle/${article.slug}`}>Edit</Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
            <section className="base column is-8 is-offset-2">
              <div className="content is-medium">
                <p className="article-main media">{article.body}</p>
              </div>

              <div className="tags">
                {article.tagList ? (
                  article.tagList.map((tag, i) => {
                    return (
                      <span key={i} className="tag">
                        {tag}
                      </span>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <hr />
            </section>
          </>
        ) : (
          <>
            <section className="hero is-small is-success is-bold">
              <div className="hero-body">
                <div className="container hero-container">
                  <h1>Loading...</h1>
                </div>
              </div>
            </section>
          </>
        )}
        <section className="column is-6 is-offset-3">
          {localStorage.token?(

          <article class="media">
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea
                    class="textarea"
                    onChange={this.handleChange}
                    value={this.state.body}
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
          ):(
            ""
          )}
        </section>
        <section className="column is-6 is-offset-3">
          {comments
            ? comments.reverse().map((comment, i) => (
                <article key={i} className="media comment-box">
                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea
                          style={{ border: "none" }}
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
                                pathname: "/authorProfile",
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
                      <div className="level-right">
                        <div className="level-item">
                          <div className="level-item">
                            <button
                              className="button is-text"
                              onClick={() => this.handleDelete(comment.id)}
                            >
                              <span className="icon is-small">
                                <i className="fas fa-trash-alt" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
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
