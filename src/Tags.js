import React from "react";
import axios from "axios";

class Tags extends React.Component {
  state = {
    tags: []
  };

  componentDidMount() {
    const url = "https://conduit.productionready.io/api/tags";
    axios.get(url).then(res => {
      const tagObj = res.data;
      this.setState({ tags: tagObj.tags });
    });
  }

  render() {
    return (
      <div className="tags box tag-container">
        <div className="tag-title">
          <p>Popular Tags</p>
        </div>
        {this.state.tags.map((tag, i) => (
          <button key={i} className="tag button is-success is-medium">
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

export default Tags;
