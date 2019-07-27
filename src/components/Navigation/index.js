import React from "react";
import { SignInForm } from "../SignIn";
import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
import { FlexSpan, MainMenu, AuthNavSpan } from "./styles";

import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <MainMenu>
    <Link to={ROUTES.HOME} onClick={() => window.scrollTo(0, 0)}>
      <p>Socialbook</p>
    </Link>
    <AuthNavSpan>
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
    </AuthNavSpan>
  </MainMenu>
);

const NavigationNonAuth = () => (
  <MainMenu>
    <Link to={ROUTES.LANDING} onClick={() => window.scrollTo(0, 0)}>
      <p>Socialbook</p>
    </Link>
    <div>
      <span>
        <SignInForm />
      </span>
      <FlexSpan>
        <span>
          <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </span>
        <span>
          <Link to={ROUTES.SIGN_UP}>New? Sign Up</Link>
        </span>
      </FlexSpan>
    </div>
  </MainMenu>
);

export default Navigation;
