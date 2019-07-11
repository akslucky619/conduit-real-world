import React from "react";
import { Link } from "react-router-dom";
import "bulma";

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

  // handleSubmit= () =>{
  //   const url = 'https://conduit.productionready.io/api/users'
  //   const { email, password, password } = this.state;
  //   const data =
  //   fetch(url)
  // }

  render() {
    return (
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
              <button className="button is-success is-large ">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
