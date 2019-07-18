import React from "react";

var callback = function callback(currentValue) {
  var arr = [];

  for (let i = 0; i < currentValue; i++) {
    arr.push(<button key={i}> {i}</button>);
  }

  return arr;
};

const Pagination = props => {
  return callback(props.i);
};

export default Pagination;
