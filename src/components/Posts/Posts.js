import React, { Component } from "react";
import UploadImage from "./UploadImage";
import { withFirebase } from "../Firebase";
import PostsList from "./PostsList";
// import TextArea from "./TextArea";
// import { AuthUserContext } from "../Session";
import styled from "styled-components";
//

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
  images: {},
  isPublic: false,
  text: ""
};
class PostsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  onChangeText = event => {
    this.setState({
      text: event.target.value,
      authorID: this.props.firebase.activeUser.uid
    });
    // console.log(this.state.text);
  };
  onChangeCheckbox = event => {
    this.setState({ isPublic: event.target.checked });
    console.log("Public: " + this.state.isPublic);
  };

  handleImageChange(e) {
    e.preventDefault();
    const fileTypes = ["jpg", "jpeg", "png", "gif"];
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      let extension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      const isImage = fileTypes.indexOf(extension) > -1;

      const size = file.size < 1048487;
      if (!isImage) {
        this.setState({
          error: "Sorry, the file is not an image",
          images: { imageUrl: "" }
        });
      } else if (!size) {
        this.setState({
          error: "Sorry, the file is too big",
          images: { imageUrl: "" }
        });
      } else {
        this.setState({ error: null });
        reader.onloadend = () => {
          this.setState({
            error: null,
            images: { imageName: file.name, imageUrl: reader.result }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  createPost() {
    this.props.firebase
      .posts()
      .add({
        username: this.props.firebase.activeUser.username,
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
        <h2>
          Hello
          <label> {this.props.firebase.activeUser.username}!</label>
        </h2>
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
          buttonLabel={"Upload Image"}
          handleImage={this.handleImageChange}
          imageUrl={this.state.images.imageUrl}
          error={this.state.error}
        />

        <button
          disabled={isInvalid}
          type="submit"
          onClick={() => {
            this.createPost();
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
        <PostsList />
      </div>
    );
  }
}

const Posts = withFirebase(PostsBase);

export default Posts;
