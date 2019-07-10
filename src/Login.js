import React from "react";

const url = "https://conduit.productionready.io/api/users/login";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    user: null
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(state => ({
      [name]: value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: this.state })
    })
      .then(res => res.json())
      .then(data => {
        if (data !== null) {
          localStorage.setItem("token", data.user.token);
          this.setState({
            user: data.user
          });
        }
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text" name="email" />
        <input onChange={this.handleChange} type="password" name="password" />
        <button>Submit</button>
      </form>
    );
  }
}

export default Login;
