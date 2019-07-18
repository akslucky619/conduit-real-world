import React from "react";
import { Redirect } from "react-router-dom";
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
      user: {
        [name]: value
      }
    });
  };

  componentDidMount = () => {
    fetch("https://conduit.productionready.io/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(({ user }) => {
        console.log(user, "user in edit");
        this.setState({ user: user });
      });
  };

  handleClick = () => {
    // const { bio, image, email, username } = this.state;
    // const data = {
    //   user: { bio, image, email, username }
    // };
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
        this.props.history.push("/");
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };
  render() {
    console.log(this.state.user, "user");
    const { bio, image, username, email } = this.state.user;
    // console.log(user, "doosri baar waala");
    return (
      <>
        <Header />
        {localStorage.token ? (
          <>
            <div className="column is-two-fifths is-offset-one-quarter">
              <div className="field">
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    name="image"
                    type="text"
                    value={image}
                    placeholder="URL of profile picture"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="text"
                    name="username"
                    value={username}
                    placeholder="New username"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    name="bio"
                    onChange={this.handleChange}
                    value={bio}
                    placeholder="Bio"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="new email"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="password"
                    name="password"
                    placeholder="New Password"
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    onClick={this.handleClick}
                    className="button is-link is-right"
                  >
                    Submit
                  </button>
                  <button
                    onClick={this.handleLogout}
                    className="button is-link is-right"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </>
    );
  }
}
