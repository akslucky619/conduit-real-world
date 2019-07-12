import React from "react";

class Profile extends React.Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    const data = {
      user: this.state
    };
    fetch("https://conduit.productionready.io/api/user", {});
  };
}
