import React from "react";
import axios from "axios";

class Tags extends React.Component {
  state = {
    tags: [],
    articles: []
  };

  componentDidMount() {
    const url = "https://conduit.productionready.io/api/tags";
    axios.get(url).then(res => {
      const tagObj = res.data;
      this.setState({ tags: tagObj.tags });
    });
  }

  tagClick = tag => {
    console.log(tag, "ye hai mera tag ");
    fetch(
      `https://conduit.productionready.io/api/articles?limit=10&offset=0&tag=${tag}`
    )
      .then(res => res.json())
      .then(({ articles }) => {
        console.log(articles, "tag waale");
        this.setState({ articles });
      });
  };

  render() {
    return (
      <div className="tags box tag-container">
        <div className="tag-title">
          <p>Popular Tags</p>
        </div>
        <div>
          {this.state.tags.map((tag, i) => (
            <button
            style={{"borderRadius":"16px"}}
              key={i}
              onClick={() => this.tagClick(tag)}
              className="tag button is-dark is-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Tags;
