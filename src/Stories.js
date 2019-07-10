import React from "react";

import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    articles: []
  };

  componentDidMount() {
    axios.get(`https://conduit.productionready.io/api/articles`).then(res => {
      const stories = res.data;
      console.log(stories);
      this.setState({ articles: stories.articles });
    });
  }

  render() {
    return (
      <ul>
        {this.state.articles.map(article => (
          <li>{article.title}</li>
        ))}
      </ul>
    );
  }
}
