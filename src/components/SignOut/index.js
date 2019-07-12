import React from "react";
import { withFirebase } from "../Firebase";
import Button from "../Button";

const SignOutButton = ({ firebase }) => (
  <Button name="Sign Out" action={firebase.doSignOut} />
);

export default withFirebase(SignOutButton);
