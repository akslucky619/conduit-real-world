import React from "react";
import { Hero } from "./Home";

class Create extends React.Component {
  render() {
    return (
      <>
        <Hero />
        <div className="column is-three-fifths is-offset-one-fifth">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Article Title" />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="What is this article about?"
              />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Write your article (in markdown)"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
