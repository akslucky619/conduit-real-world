import React from "react";

class SingleArt extends React.Component {
  state = {
    article: {}
  };

  componentDidMount = () => {
    const { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(({ article }) => {
        console.log(article, "lodu");
        this.setState({ article: article });
      });
  };

  render() {
    return (
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48" />
              {/* <img /> */}
            </div>
            <div class="media-content">
              <p class="title is-4" />
            </div>
          </div>
          <div class="content">
            <br />
            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArt;
