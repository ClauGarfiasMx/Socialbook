import React from "react";
import Posts from "../Posts";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session";
import styled from "styled-components";
import Searcher from "../SearchBooks";
// import Messages from "../Messages";

const HomeMain = styled.main`
  padding-top: 10rem;
`;

const HomePage = () => (
  <HomeMain>
    <Searcher />
    <Posts />
  </HomeMain>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
