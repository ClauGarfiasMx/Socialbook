import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import styled, { css } from "styled-components";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import Posts from "../Posts";

const Footer = styled.footer`
  padding: 3rem;
  background-color: #283033;
  justify-content: center;
  height: 5rem;
  p {
    font-size: 0.85rem;
    color: #fff;
    font-family: "Thasadith", sans-serif;
    letter-spacing: 0.05rem;
  }
`;
const App = () => {
  return (
    <div>
      <Router>
        <React.Fragment>
          {/* Navigation uses AuthContext to consume the authenticated user*/}
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route exact path={ROUTES.POST} component={Posts} />
        </React.Fragment>
      </Router>
      <Footer>
        <p>Made with passion by 💟 Patricia Garfias 2019</p>
        <p>Currently using React {React.version}</p>
      </Footer>
    </div>
  );
};

export default withAuthentication(App);
