import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withEmailverification = Component => {
  //Add a function in this file that checks if the
  //authenticated user has a verified email and an
  //email/password sign in on associated with it
  const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
      .map(provider => provider.providerId)
      .includes("password");
  //If this is true, don’t render the component passed
  //to this higher-order component, but a message that
  //reminds users to verify their email addresses.

  class withEmailverification extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isSent: false };
    }
    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page once
                    you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder included)
                    for a confirmation E-Mail or send another confirmation
                    E-Mail.
                  </p>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(withEmailverification);
};

export default withEmailverification;
