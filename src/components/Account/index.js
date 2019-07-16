import React from "react";
import Profile from "./Profile";
import { compose } from "recompose";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        {/* <h2>Account belongs to {authUser.username}.</h2>
        <img src={authUser.profilePic.imageUrl} alt="Profile" />
        <p>
          <strong>USER ID:</strong> {authUser.uid}
        </p> */}
        <Profile authUser={authUser} />
        <div>
          <h3>I forgot my Password:</h3>
          <PasswordForgetForm />
        </div>
        <div>
          <h3>I want to reset my Password:</h3>
          <PasswordChangeForm />
        </div>
        {/* {console.log(authUser)} */}
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => authUser && !!authUser;
// const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
