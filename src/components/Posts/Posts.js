import React, { Component } from "react";
import UploadImage from "../Utils/UploadImage";
import { withFirebase } from "../Firebase";
import PostsList from "./PostsList";
import { AuthUserContext } from "../Session";
import styled from "styled-components";
import {
  PostContainer,
  TextArea,
  CreatePostSection,
  ButtonRed
} from "./stylePosts";

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
      authorID: this.props.firebase.activeUser.uid,
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
      <React.Fragment>
        <PostContainer>
          <CreatePostSection>
            <span>
              <AuthUserContext.Consumer>
                {auhtUser => (
                  <h1>
                    Greadings
                    <label> {auhtUser.username}!</label>
                  </h1>
                )}
              </AuthUserContext.Consumer>
              <h3>What are you reading?</h3>
              <TextArea
                type="text"
                onChange={this.onChangeText}
                value={this.state.text}
                rows={"8"}
                aria-required={true}
                aria-invalid={false}
              />
              <UploadImage
                uploadImage={this.uploadImage}
                buttonLabel={"Upload Image"}
                imageUrl={this.state.images.imageUrl}
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
              <AuthUserContext.Consumer>
                {authUser => (
                  <div>
                    <ButtonRed
                      onClick={() => {
                        this.setState({ ...INITIAL_STATE });
                      }}
                    >
                      Cancel
                    </ButtonRed>
                    <button
                      disabled={isInvalid}
                      type="submit"
                      onClick={() => {
                        this.createPost(authUser.username);
                      }}
                    >
                      Share
                    </button>
                  </div>
                )}
              </AuthUserContext.Consumer>
            </span>
          </CreatePostSection>
          <PostsList />
        </PostContainer>
      </React.Fragment>
    );
  }
}

const Posts = withFirebase(PostsBase);

export default Posts;
