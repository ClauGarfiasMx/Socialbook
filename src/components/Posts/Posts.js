import React, { Component } from "react";
import UploadImage from "./UploadImage";
import { withFirebase } from "../Firebase";
import PostsList from "./PostsList";
import { AuthUserContext } from "../Session";
import styled from "styled-components";

const TextArea = styled.textarea`
  background-color: #fff !important;
  border: 1px solid #b6b6b6;
  width: 50% !important;
  -moz-border-radius: 1px solid #b6b6b6
  -webkit-border-radius:1px solid #b6b6b6
  border-radius: 5px;
  font-family: Open Sans, Arial, sans-serif;
  font-size: 15px;
  color: #404b56 !important;
  padding: 16px !important;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const INITIAL_STATE = {
  authorID: "",
  bookIt: 0,
  comments: [],
  error: null,
  images: {
    imageName: "",
    imageUrl: ""
  },
  isPublic: false,
  text: ""
};
class PostsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
    this.createPost = this.createPost.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  onChangeText = event => {
    this.setState({
      text: event.target.value
    });
  };
  onChangeCheckbox = event => {
    this.setState({ isPublic: event.target.checked });
    console.log("Public: " + this.state.isPublic);
  };

  uploadImage(images) {
    this.setState({ images: images });
  }

  createPost(postAuthor) {
    this.props.firebase
      .posts()
      .add({
        username: postAuthor,
        createdAt: new Date(),
        ...this.state
      })
      .then(() => {
        console.log(this.state);
        this.setState({ ...INITIAL_STATE });
        console.log("Document successfully written!");
        console.log(this.state);
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  render() {
    const isInvalid = this.state.error != null || this.state.text === "";

    return (
      <div>
        <AuthUserContext.Consumer>
          {auhtUser => (
            <h2>
              Hello
              <label> {auhtUser.username}!</label>
            </h2>
          )}
        </AuthUserContext.Consumer>
        <h3>What are you reading?</h3>
        <TextArea
          type="text"
          onChange={this.onChangeText}
          value={this.state.text}
          rows={"10"}
          aria-required={true}
          aria-invalid={false}
        />
        <div>
          <label>
            <input
              name="isPublic"
              type="checkbox"
              checked={this.state.isPublic}
              value={false}
              onChange={this.onChangeCheckbox}
            />
            Private (visible only in my club):
          </label>
        </div>

        <UploadImage
          uploadImage={this.uploadImage}
          buttonLabel={"Upload Image"}
          imageUrl={this.state.images.imageUrl}
        />
        <AuthUserContext.Consumer>
          {authUser => (
            <React.Fragment>
              <button
                disabled={isInvalid}
                type="submit"
                onClick={() => {
                  this.createPost(authUser.username);
                }}
              >
                Share
              </button>
              <button
                onClick={() => {
                  this.setState({ ...INITIAL_STATE });
                }}
              >
                Cancel
              </button>
            </React.Fragment>
          )}
        </AuthUserContext.Consumer>
        <PostsList />
      </div>
    );
  }
}

const Posts = withFirebase(PostsBase);

export default Posts;
