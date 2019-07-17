import React from "react";
import { NavLink } from "react-router-dom";
function Tabs() {
  return (
    <div className="tabs is-medium">
      <ul>
        <li className="is-active">
          <NavLink to="#">Gloabal feed</NavLink>
        </li>
        <li>
          <NavLink to="#">Your feed</NavLink>
        </li>
        <li>
          <NavLink to="#" />
        </li>
      </ul>
    </div>
  );
}

export default Tabs;
