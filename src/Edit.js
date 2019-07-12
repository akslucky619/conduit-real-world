import React from "react";
import Header from "./Header";

export default class EditUser extends React.Component {
  state = {
    bio: "",
    email: "",
    image: "",
    username: "",
    password: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleClick = () => {
    const data = {
      user: this.state
    };

    fetch("https://conduit.productionready.io/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        console.log(user, "put req");
      });
  };

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
                onChange={this.handleChange}
                class="input"
                name="image"
                type="text"
                placeholder="URL of profile picture"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                onChange={this.handleChange}
                class="input"
                type="text"
                name="username"
                // value={this.state.username}
                placeholder="New username"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                name="bio"
                onChange={this.handleChange}
                placeholder="Bio"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                onChange={this.handleChange}
                class="input"
                type="text"
                name="email"
                placeholder="new email"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                onChange={this.handleChange}
                class="input"
                type="text"
                name="password"
                placeholder="New Password"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button
                onClick={this.handleClick}
                class="button is-link is-right"
              >
                Submit
              </button>
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
