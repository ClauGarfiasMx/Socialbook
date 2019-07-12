import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const ErrorParagraph = styled.p`
  color: #ff0000;
`;

const SignInPage = () => (
  <div>
    <h2>Sign In</h2>
    <SignInForm />
    <p>
      I would like to <SignUpLink />
    </p>
    <p>
      <PasswordForgetLink />
    </p>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  codeMessageMapper(errorCode) {
    let message = "";
    switch (errorCode) {
      case "auth/invalid-email":
        message = "Invalid Email";
        break;
      case "auth/user-not-found":
        message = "User not found";
        break;
      case "auth/wrong-password":
        message = "Wrong Pasword";
        break;
      case "auth/email-already-in-use":
        message = "Email already in use";
        break;
      case "auth/weak-password":
        message = "Password must have at least 6 characters";
        break;
      default:
    }

    return message;
  }

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <label>Email: </label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <label> Password: </label>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Contraseña"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && (
          <ErrorParagraph>{this.codeMessageMapper(error.code)}</ErrorParagraph>
        )}
      </form>
    );
  }
}

const SignInLink = () => (
  <React.Fragment>
    <Link to={ROUTES.SIGN_IN}> Sign In </Link>
  </React.Fragment>
);

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };
