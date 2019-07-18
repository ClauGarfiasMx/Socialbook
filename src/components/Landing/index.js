import React from "react";
import { SignUpLink } from "../SignUp";
import { SignInForm } from "../SignIn";
import { PasswordForgetLink } from "../PasswordForget";
import { book, bookshelf, reading } from "../../assets";
import device from "../../css";
import styled from "styled-components";

const HeaderSection = styled.header`
  background-color: transparent;
  height: 125vh;
  padding-bottom: 25vh;

  @media ${device.tablet} {
    height: 120vh;
  }
  div {
    position: -webkit-sticky;
    position: sticky;
    top: 30vh;
  }

  h1 {
    margin: 0 auto;
    font-size: 7rem;
    @media ${device.tablet} {
      font-size: 5rem;
    }

    @media ${device.mobileL} {
      font-size: 3rem;
    }
  }
  h2 {
    margin-top: 0;
    @media ${device.desktop} {
      font-size: 2.5rem;
    }
    @media ${device.tablet} {
      font-size: 1.5rem;
    }
  }
  img {
    margin: 35vh auto -20vh auto;
    width: 35%;
    z-index: 1;
    position: relative;
    @media ${device.laptop} {
      width: 60%;
    }
    @media ${device.mobileL} {
      width: 80%;
    }
  }
`;

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 25vh;

  a {
    color: #283033;
    text-decoration: none;
    border-bottom: 1px solid #283033;
  }
  button {
    margin-top: 1rem !important;
    padding: 0.5rem;
  }
  p {
    position: -webkit-sticky;
    position: sticky;
    top: 50vh;
    font-size: 1.25rem;
    max-width: 50%;
    margin: auto;

    @media ${device.laptop} {
      max-width: 80%;
    }
  }
  img {
    max-width: 20%;
    z-index: 1;
    margin: auto;
    padding-bottom: 15vh;
  }
`;
const ParallaxBackground = styled.div`
  height: 60vh;
  background-image: url(${reading});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  padding: 3.5rem 0;
  a {
    border-bottom: 1px solid #fff;
    color: #fff;
    text-decoration: none;
  }
  div {
    background-color: #21353dab;
    color: #fff;
    height: 25rem;
    margin: 1rem;
    padding: 1rem;
  }
  button {
    padding: 0.5rem;
    font-family: "Thasadith", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    width: 15.65rem !important;
    background-color: #283033;
    color: #ffff;
    border: none;
    margin-top: 0.75rem !important;
    cursor: pointer;
    :hover {
      background-color: #20aefa;
    }
  }
  button:disabled,
  button[disabled] {
    background-color: #46869e82;
    color: #ffffffa6 !important;
    cursor: default;
  }
  form {
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
      font-family: "Thasadith", sans-serif;
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 600;
      background-color: #ff0000bd;

      color: #ffffffbd !important;

      max-width: 50%;

      margin: auto !important;

      padding: 0.25rem;
    }
  }
  form * {
    margin: 0rem auto 0.5rem auto;
    width: 15rem;
  }
  input {
    border: none;
    padding: 0.25rem;
    font-family: "Thasadith", sans-serif;
    font-size: 1.35rem;
    text-align: center;
    ::placeholder {
      font-size: 1rem;
      text-transform: uppercase;
    }
  }
`;

const Landing = () => (
  <div>
    <HeaderSection id="main-header">
      <div>
        <h1>Socialbook</h1>
        <h2>Share {"&"} Read</h2>
      </div>
      <img src={book} alt="open book" />
    </HeaderSection>
    <ParallaxBackground id="signin-section">
      <div>
        <h2>Sign In</h2>
        <SignInForm />
        <p>
          <PasswordForgetLink />
        </p>
        <p>
          <SignUpLink />
        </p>
      </div>
    </ParallaxBackground>
    <IntroSection>
      <p>
        Socialbook is the site to share your reading picks.
        <br />
        Use our <a href={"#"}>explorer</a> to discover new exciting readings
        based on your taste.
        <br />
        Save your favorite readings, share them with friends and find out what
        they are reading.
      </p>
      <img src={bookshelf} alt="a book shelf" />
    </IntroSection>
  </div>
);

export default Landing;
