import React from "react";
import { Link } from "react-router-dom";
import "bulma";
import Header from "./Header"

export default class Register extends React.Component {
  state = {
    usernmae: "",
    email: "",
    password: ""
  };

  handlechange = ({ target }) => {
    const { name, value } = target;
    this.setState(state => ({
      [name]: value
    }));
  };

  handleClick = () => {
    const data = {
      user: this.state
    };
    fetch("https://conduit.productionready.io/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        console.log(user, "check user");
      });
  };

  render() {
    return (
      <>
      <Header/>
      <div class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
          <div className="sign-header">
            <h1 className="subtitle is-1 ">Sign Up</h1>
            <Link to="/login">Have an account?</Link>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-large"
                type="text"
                placeholder="Username"
                onChange={this.handlechange}
                name="username"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-large"
                type="email"
                placeholder="Email"
                onChange={this.handlechange}
                name="email"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input is-large"
                type="password"
                placeholder="Password"
                onChange={this.handlechange}
                name="password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={this.handleClick}
                className="button is-success is-large "
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
      </>
    );
  }
}
