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
