import React from "react";
// import SingleArt from
import Header from "./Header";

class EditBlog extends React.Component {
  state = {
    title: "",
    description: "",
    body: "",
    tagList: ""
  };

  componentDidMount = () => {
    const tagList = this.state.tagList.split(",").map(tag => tag.trim());
    const { title, description, body } = this.state;
    const data = {
      article: {
        title,
        description,
        body,
        tagList
      }
    };
    const { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(article => {
        console.log(article, "in edit");
      });
  };

  render() {
    return (
      <>
        <Header />
        <div className="column is-three-fifths is-offset-one-fifth">
          <div class="field">
            <div class="control">
              <input
                onChange={this.handleChange}
                class="input"
                type="text"
                name="title"
                placeholder="Article Title"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                onChange={this.handleChange}
                class="input"
                type="text"
                name="description"
                placeholder="What is this article about?"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea
                onChange={this.handleChange}
                class="textarea"
                name="body"
                placeholder="Write your article (in markdown)"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                onChange={this.handleChange}
                class="input"
                type="text"
                name="tagList"
                placeholder="Input Tags"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button onClick={this.handleClick} class="button is-link">
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditBlog;
