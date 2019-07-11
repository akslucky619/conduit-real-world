import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Login from "./Login";
import Stories from "./Stories";
import Home from "./Home";
import CreateBlog from "./CreateBlog";

import "./styles.css";
import "bulma/css/bulma.css";
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/stories" component={Stories} />
      <Route path="/create" component={CreateBlog} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);