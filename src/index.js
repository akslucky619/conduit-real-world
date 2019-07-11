import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Login from "./Login";
import Stories from "./Stories";
import Home from "./Home";
import CreateBlog from "./CreateBlog";
import Edit from "./Edit";

import "./styles.css";
import "bulma/css/bulma.css";
import Register from "./Register";

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      fetch("https://conduit.productionready.io/api/user", {
        method: "GET",
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/stories" component={Stories} />
        <Route path="/create" component={CreateBlog} />
        <Route path="/edit" component={Edit} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
