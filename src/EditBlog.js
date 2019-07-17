import React from "react";
// import SingleArt from
import Header from "./Header";

class EditBlog extends React.Component {
  state = {
    article: {
      title: "",
      description: "",
      body: "",
      tagList: ""
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
      .then(article => {
        console.log(article, "in edit");
        this.setState({ article: article.article });
        console.log(article, "part 2");
      });
  };

  inputChange = ({ target: { name, value } }) => {
    console.log(name, "name");
    this.setState({
      article: {
        [name]: value
      }
    });
  };

  handleClick = () => {
    const { slug } = this.props.match.params;
    // const tagList = this.state.article.tagList
    //   .split(",")
    //   .map(tag => tag.trim());
    const { title, description, body, tagList } = this.state.article;
    const data = {
      article: {
        title,
        description,
        body,
        tagList
      }
    };
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
        console.log(article, "posting article");
      }, this.props.history.push("/"));
  };

  render() {
    const article = this.state.article;
    return (
      <>
        <Header />
        {localStorage.token ? (
          <>
            <div className="column is-three-fifths is-offset-one-fifth">
              <div class="field">
                <div class="control">
                  <input
                    onChange={this.inputChange}
                    class="input"
                    type="text"
                    name="title"
                    value={article.title}
                    placeholder="Article Title"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    onChange={this.inputChange}
                    class="input"
                    type="text"
                    name="description"
                    value={article.description}
                    placeholder="What is this article about?"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <textarea
                    onChange={this.inputChange}
                    class="textarea"
                    name="body"
                    value={article.body}
                    placeholder="Write your article (in markdown)"
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    onChange={this.inputChange}
                    class="input"
                    type="text"
                    name="tagList"
                    value={article.tagList}
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
        ) : (
          <h1>Login First</h1>
        )}
      </>
    );
  }
}

export default EditBlog;
