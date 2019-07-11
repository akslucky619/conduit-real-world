import React from "react";
import Header from "./Header";

export default class EditUser extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <Header />
        <div className="column is-two-fifths is-offset-one-quarter">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="URL of profile picture"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="What is this article about?"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Write your article (in markdown)"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Input Tags" />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Article Title" />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link is-right">Submit</button>
              <button
                onClick={this.handleLogout}
                class="button is-link is-right"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
