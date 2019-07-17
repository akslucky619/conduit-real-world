import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  console.log(localStorage.token, "check token");
  return (
    <header className="base column is-8 is-offset-2">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="title is-3 isPrimary">
            <Link className="navbar-item green-text" to="/">
              Conduit
            </Link>
          </h1>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <NavLink exact className="navbar-item" to="/">
              Home
            </NavLink>
            {localStorage.token ? (
              <>
                <NavLink exact className="navbar-item" to="/create">
                  New Post
                </NavLink>
                <NavLink exact className="navbar-item" to="/edit">
                  Settings
                </NavLink>
                <NavLink exact className="navbar-item" to="/profile">
                  Account
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact className="navbar-item" to="/login">
                  Sign In
                </NavLink>
                <NavLink exact className="navbar-item" to="/register">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
