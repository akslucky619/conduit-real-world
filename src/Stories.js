import React from "react";
import "bulma";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Stories extends React.Component {
  state = {
    articles: []
  };

  componentDidMount() {
    axios.get(`https://conduit.productionready.io/api/articles`).then(res => {
      const stories = res.data;
      console.log(stories, "in home");
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
                  <img src={article.author.image} alt="" />
                </div>
                <div class="media-content">
                  <p class="title is-4">{article.author.username}</p>
                  <Link to={`/article/${article.slug}`} class="subtitle is-6">
                    {article.title}
                  </Link>
                </div>
              </div>
              <div class="content">
                {article.description}
                <br />
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        ))}
      </ul>
    );
  }
}
