import react from "react";

class Comments extends React.Component {
  state = {
    Comments: {}
  };

  componentDidMount = () => {
    fetch(
      `https://conduit.productionready.io/api/articles/${slug}/comments
      `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(comments => {
        console.log(comments, "inside comments");
        this.setState({ comments: comments.comments });
      });
  };
}
