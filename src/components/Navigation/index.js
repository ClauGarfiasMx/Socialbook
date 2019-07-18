import React from "react";
import { SignInForm } from "../SignIn";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled, { css } from "styled-components";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import device from "../../css";

const MainMenu = styled.nav`
  align-items: center;
  display: flex;
  padding: 2rem 0;
  justify-content: space-between;
  position: fixed;
  width: 100%;

  z-index: 1000;
  span {
    margin: 0.5rem;
    :last-child {
      margin-right: 5rem;
    }
  }
  a {
    color: #000;
    text-decoration: none;
  }
  p {
    font-size: 1.25rem;
    margin-left: 5rem;
    @media ${device.tablet} {
      margin-left: 0.5rem;
    }
  }
  div {
    display: flex;
  }
  form {
    label {
      font-family: "Thasadith", sans-serif;
      display: none;
    }
    input {
      font-family: "Thasadith", sans-serif;
      font-size: 0.9rem;
      line-height: 0.85rem;
      margin-right: 0.5rem;
      padding: 0.35rem;
      max-width: 8rem;
      border: #dcd6cc 1px solid;
    }
    button {
      padding: 0.3rem;
      font-family: "Thasadith", sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      width: 5rem !important;
      background-color: #000;
      color: #ffff;
      border: none;
      cursor: pointer;
      margin-top: -0.5rem !important;
    }
    button:disabled,
    button[disabled] {
      background-color: #d5c24d80;
      color: #19190187;
      cursor: default;
    }
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
    <Link to={ROUTES.LANDING} onClick={() => window.scrollTo(0, 0)}>
      <p>Socialbook</p>
    </Link>
    <div>
      {/* <span>
        <Link to={ROUTES.LANDING}>
          <a>Welcome</a>
        </Link>
      </span> */}
      <span>
        {/* <HashLink to={"#signin-section"}> */}
        <SignInForm />
        {/* </HashLink> */}
      </span>
      <span rightmargin>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </span>
    </div>
  </MainMenu>
);

export default Navigation;
