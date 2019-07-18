import React, { Component } from "react";
import { profileegg, readingwoman } from "../../assets";

import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import UploadImage from "../Utils/UploadImage";
import styled from "styled-components";

const SignUpSection = styled.main`
  display: flex;
  height: 100vh;
`;

const ImageSignUp = styled.div`
  height: 100vh;
  background-image: url(${readingwoman});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  width: 50%;
  img {
    display: none;
    width: 100%;
  }
`;
const FormContainer = styled.div`
  padding-top: 6rem;
  width: 50%;
`;

const FormSignUp = styled.form`
  display: flex;
  max-width: 20rem;
  margin: auto;
  label:first-child {
    margin-top: 2rem !important;
  }
  ${props => props.vertical && "flex-direction: column;"} > * {
    flex: 1;

    &:not(:first-child) {
      ${props => (props.vertical ? "margin-top" : "margin-left")}: 0.5rem;
    }
  }

  input {
    font-family: "Thasadith", sans-serif;
    font-size: 1.1rem;
    line-height: 0.85rem;
    padding: 0.25rem;
    border: #dcd6cc 1px solid;
    ::placeholder {
      font-size: 0.75rem;
      text-transform: uppercase;
    }
  }

  button {
    padding: 0.5rem;
    font-family: "Thasadith", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    background-color: #283033;
    color: #ffff;
    border: none;
    margin: 0;
    cursor: pointer;
  }
  button:disabled,
  button[disabled] {
    background-color: #46869e82;
    color: #ffffffa6 !important;
    cursor: default;
  }
  img {
    border-radius: 50%;
    max-width: 8rem;
    margin: 0 auto;
  }
  h2 {
    margin-bottom: 0;
  }
  p {
    font-family: "Thasadith", sans-serif;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 600;
    margin-right: 0.5rem;
  }
`;
const SignUpPage = () => (
  <React.Fragment>
    <SignUpSection>
      <FormContainer>
        <SignUpForm />
      </FormContainer>
      <ImageSignUp />
    </SignUpSection>
  </React.Fragment>
);

// INITIAL_STATE Captures User Information
const INITIAL_STATE = {
  username: "",
  email: "",
  error: null,
  isAdmin: false,
  passwordOne: "",
  passwordTwo: "",
  profilePic: {
    imageName: "",
    imageUrl: profileegg
  }
};

// SignUpForm Manages the FORM STATE in React's local state
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }; // ... is SPREAD OPERATOR, here is like a PUSH METHOD
    this.uploadProfilePic = this.uploadProfilePic.bind(this);
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin, profilePic } = this.state;
    const roles = {};
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in Firestore MERGE Users
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            profilePic,
            roles
          },
          { merge: true }
        );
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME); // Pushes the route to the history object
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  uploadProfilePic(img) {
    this.setState({ profilePic: img });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <FormSignUp vertical onSubmit={this.onSubmit} className="sign-up-form">
        <h2>Create an Account </h2>
        <UploadImage
          uploadImage={this.uploadProfilePic}
          buttonLabel={"Upload profile photo"}
          imageUrl={this.state.profilePic.imageUrl}
        />
        <label>User Name</label>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="User Name"
        />
        <label>Email</label>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email"
        />
        <label>Password</label>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <label>Confirm Password</label>
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          I am an administrator user:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </FormSignUp>
    );
  }
}

const SignUpLink = () => (
  <React.Fragment>
    <Link to={ROUTES.SIGN_UP}> Sign Up </Link>
  </React.Fragment>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
