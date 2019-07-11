import React from "react";
import "bulma";
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
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48" />
                  <img src={article.author.image} />
                </div>
                <div class="media-content">
                  <p class="title is-4">{article.author.username}</p>
                  <p class="subtitle is-6">{article.title}</p>
                </div>
              </div>
              <div class="content">
                {article.description}
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        ))}
      </ul>
    );
  }
}
