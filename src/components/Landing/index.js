import React from "react";
import { SignUpLink } from "../SignUp";
import { SignInLink } from "../SignIn";

const Landing = () => (
  <div>
    <h2>
      Welcome to Socialbook, ¿Would you like to <SignUpLink />?
    </h2>
    <h2>
      Or <SignInLink />
    </h2>
  </div>
);

export default Landing;
