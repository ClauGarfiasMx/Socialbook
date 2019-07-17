import React from "react";
import { SignInForm } from "../SignIn";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const MainMenu = styled.nav`
  align-items: center;
  display: flex;
  padding: 2rem 0;
  justify-content: space-between;
  max-width: 90%;
  position: fixed;
  width: 100%;
  z-index: 1000;
  span {
    margin: 0.5rem;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  p {
    margin-left: 10%;
  }
`;

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <MainMenu>
    <p>Socialbook</p>
    <div>
      <span>
        <Link to={ROUTES.HOME}>Home</Link>
      </span>
      <span>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </span>
      {!!authUser.roles[ROLES.ADMIN] && (
        <span>
          <Link to={ROUTES.ADMIN}>Admin Page</Link>
        </span>
      )}

      <span>
        <SignOutButton />
      </span>
    </div>
  </MainMenu>
);

const NavigationNonAuth = () => (
  <MainMenu>
    <p>Socialbook</p>
    <div>
      <span>
        <Link to={ROUTES.LANDING}>Welcome</Link>
      </span>
      <span>
        <Link to={"#signin-section"}>Sign In</Link>
      </span>
      <span>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </span>
    </div>
  </MainMenu>
);

export default Navigation;
