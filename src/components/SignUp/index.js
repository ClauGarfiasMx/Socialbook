import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import UploadImage from "../Utils/UploadImage";
import styled from "styled-components";

const FormSignUp = styled.form`
  display: flex;
  max-width: 20rem;
  padding: 0.5rem;
  ${props => props.vertical && "flex-direction: column;"} > * {
    flex: 1;

    &:not(:first-child) {
      ${props => (props.vertical ? "margin-top" : "margin-left")}: 0.5rem;
    }
  }

  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #b6b6b6;
  }

  input::placeholder {
    color: #ff00cb;
  }

  button {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
  }
`;
const SignUpPage = () => (
  <div>
    <h2>Sign Up </h2>
    <SignUpForm />
  </div>
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
    imageUrl:
      "https://claudiagarfias.works/laboratoria/visitors/assets/kisspng-computer-icons.png"
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
        {/* INPUTS get value from local state & updates it with a onChange handler */}
        <label>Profile Picture</label>
        <UploadImage
          uploadImage={this.uploadProfilePic}
          buttonLabel={"Upload Image"}
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
          placeholder="Confirmar Contraseña"
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
