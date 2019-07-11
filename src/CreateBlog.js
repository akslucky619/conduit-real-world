import React from "react";
// import { Hero } from "./Home";
import Header from "./Header";

class Create extends React.Component {
  state = {
    title: "",
    description: "",
    body: "",
    tags: []
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    const data = {
      article: this.state
    };
    fetch("https://conduit.productionready.io/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(article => {
        console.log(article);
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
                name="tags"
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

export default Create;
