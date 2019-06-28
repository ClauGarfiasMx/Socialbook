import React, { Component } from "react";
import { compose } from "recompose";
// import Try from "./Try";

import { withAuthorization, withEmailVerification } from "../Session";
import Messages from "../Messages";
// import PostList from "../Posts";

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Greeting />
    {/* <Try /> */}
    <Messages />
  </div>
);

class Greeting extends Component {
  state = {};
  render() {
    return <p>hi</p>;
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
