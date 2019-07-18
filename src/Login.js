import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "./Home";

const url = "https://conduit.productionready.io/api/users/login";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    user: null,
    isLoggedIn: false
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(state => ({
      [name]: value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    console.log(data);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: data })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data !== null) {
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setState({
            user: data.user
          });
          this.props.history.push("/");
        }
      });
    this.setState({ isLoggedIn: true });
  };

  render() {
    return (
      <>
        <Hero />
        <div className="column is-three-fifths is-offset-one-fifth">
          <div className="sign-header">
            <h1 className="subtitle is-1 ">Sign In</h1>
            <Link className="subtitle green-text" to="/register">
              Need an account?
            </Link>
          </div>

          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-large"
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
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
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={this.handleSubmit}
                className="button is-success is-large"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
