import React from "react";
import Stories from "./Stories";
import Tabs from "./Tabs";
import Tags from "./Tags";
import Header from "./Header";

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="column is-8 is-offset-3">
        <section className="main-container">
          <div className="columns">
            <div className="column is-three-quarters">
              <Tabs />
              <Stories />
            </div>
            <div className="column">
              <Tags />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section className="hero is-small is-success is-bold">
      <div className="hero-body">
        <div className="container hero-container">
          <h1 className="title is-1"> conduit </h1>
          <h2 className="subtitle is-4"> A place to share your knowledge.</h2>
        </div>
      </div>
    </section>
  );
}

export default Home;
