import React, { Component } from "react";
import withFirebase from "../Firebase";

class Try extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>Try</p>
      </div>
    );
  }
}

export default withFirebase(Try);
