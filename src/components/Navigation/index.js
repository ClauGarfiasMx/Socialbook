import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const MainMenu = styled.nav`
  display: flex;
  justify-content: flex-end;
  span {
    margin: 0.5rem;
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
  </MainMenu>
);

const NavigationNonAuth = () => (
  <MainMenu>
    <span>
      <Link to={ROUTES.LANDING}>Welcome</Link>
    </span>
    <span>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </span>
    <span>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </span>
  </MainMenu>
);

export default Navigation;
