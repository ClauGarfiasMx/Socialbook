import React, { Component } from "react";
import styled from "styled-components";

const ProfilePic = styled.img`
  max-width: 10rem;
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { authUser } = this.props;
    return (
      <div>
        <h2>Account belongs to {authUser.username}.</h2>
        <ProfilePic src={authUser.profilePic.imageUrl} alt="Profile" />
        <p>
          <strong>USER ID:</strong> {authUser.uid}
        </p>
      </div>
    );
  }
}

export default Profile;
