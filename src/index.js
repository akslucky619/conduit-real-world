import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import Login from "./Login";
import Stories from "./Stories";
import Home from "./Home";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Link to="/login">Login</Link>
      <Route exact path="/login" component={Login} />
      <Route exact path="/stories" component={Stories} />
    </div>
  );
}

// class Home extends React.Component{
//   render(){
//     return(
//       <Router>
//         <Link to='/login'>Login</Link>
//       </Router>
//     )
//   }
// }

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
