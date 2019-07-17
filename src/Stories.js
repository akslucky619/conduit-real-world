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
        {this.state.articles.map((article, i) => (
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img
                      className="is-rounded"
                      src={article.author.image}
                      alt=""
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{article.author.username}</p>
                  <Link
                    to={`/article/${article.slug}`}
                    className="subtitle is-6"
                  >
                    {article.title}
                  </Link>
                </div>
              </div>
              <div className="content">
                {article.description}
                <br />
                <time dateTime="2016-1-1">{article.createdAt}</time>
              </div>
            </div>
          </div>
        ))}
      </ul>
    );
  }
}
