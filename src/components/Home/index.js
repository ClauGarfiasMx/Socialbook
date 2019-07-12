import React from "react";
import Posts from "../Posts";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
// import Messages from "../Messages";

const HomePage = () => (
  <main>
    <Posts />
  </main>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
