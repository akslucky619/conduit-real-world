import React from "react";

class CommentPost extends React.Component {
  state = {
    comment: {
      body: []
    }
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
    return (
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
    );
  }
}

export default CommentPost;
