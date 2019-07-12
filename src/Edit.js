import React from "react";
import Header from "./Header";

export default class EditUser extends React.Component {
  state = {
    user: {
      bio: "",
      email: "",
      image: "",
      username: "",
      password: ""
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  // componentDidMount = () => {
  //   fetch("https://conduit.productionready.io/api/user", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${localStorage.token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(({ user }) => {
  //       console.log(user, "abe user");
  //       this.setState({ user: user });
  //     });
  // };

  handleClick = () => {
    fetch("https://conduit.productionready.io/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(user => {
        console.log(user, "put req");
        // this.setState({ user: user });
        // this.props.history.push("/");
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };
  render() {
    // const { user } = this.state;
    // console.log(user, "doosri baar waala");
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
                type="password"
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
