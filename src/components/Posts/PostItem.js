import React, { Component } from "react";
import UploadImage from "./UploadImage";
import UploadImageTry from "./UploadImageTry";
import CommentItem from "./CommentItem";
import styled from "styled-components";

const ImageFromPost = styled.img`
  max-width: 15rem;
`;
const TextArea = styled.textarea`
  background-color: #fff !important;
  border: 1px solid #b6b6b6;
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

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.post.text,
      error: null,
      images: {}
    };
    this.handleImageEdit = this.handleImageEdit.bind(this);
    this.uploadNewImage = this.uploadNewImage.bind(this);
    this.editPost = this.editPost.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }
  editPost() {
    this.setState({ editMode: true });
  }
  cancelEdit() {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.post.text
    }));
  }
  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  handleImageEdit(e) {
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

  uploadNewImage(images) {
    this.setState({ images: images });
  }

  deleteImage() {
    this.setState({ images: {} });
  }

  saveEdit = () => {
    this.props.editPost(
      this.props.post,
      this.state.images,
      this.state.editText
    );

    this.setState({ editMode: false });
  };

  render() {
    const {
      authUser,
      bookIt,
      deletePost,
      incomingPosts,
      post,
      commentPost
    } = this.props;
    const { editMode, editText, images } = this.state;
    return (
      <React.Fragment>
        {editMode ? (
          <div>
            <TextArea
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
              cols={"40"}
              rows={"6"}
              aria-required={true}
              aria-invalid={false}
            />
            {post.images.imageUrl && (
              <div>
                {/* <UploadImage
                  handleImage={this.handleImageEdit}
                  buttonLabel={"Change Image"}
                  editMode={this.state.editMode}
                  error={this.state.error}
                  deleteImage={this.deleteImage}
                  imageUrl={images.imageUrl}
                /> */}

                <UploadImageTry
                  uploadImage={this.uploadNewImage}
                  buttonLabel={"Change Image Try"}
                  editMode={this.state.editMode}
                  deleteImage={this.deleteImage}
                />
              </div>
            )}

            <button
              onClick={() => {
                console.log(this.state);
                this.saveEdit();
              }}
            >
              Update
            </button>
            <button onClick={this.cancelEdit}>Cancel</button>
            <hr />
          </div>
        ) : (
          incomingPosts && (
            <div>
              <p>
                <strong>{post.username}</strong> shared on{" "}
                <i>
                  {post.createdAt
                    .toDate()
                    .toString()
                    .slice(0, 10)}{" "}
                </i>
                at
                <i>
                  {post.createdAt
                    .toDate()
                    .toLocaleString()
                    .slice(-9, -1)}
                </i>
                :
              </p>
              <p>
                <i>{post.text} </i>
              </p>
              <ImageFromPost src={post.images.imageUrl} />
              <p />
              {post.editedAt && <i>(Edited)</i>}
              <p>
                <span role="img" aria-label="Books">
                  📚
                </span>{" "}
                Bookits: {post.bookIt}
              </p>
              <button onClick={() => bookIt(post)}>
                I{" "}
                <span role="img" aria-label="Book">
                  📖
                </span>{" "}
                it!
              </button>
              {authUser.uid === post.authorID && (
                <div>
                  <button onClick={this.editPost}>Edit Post</button>
                  <button onClick={() => deletePost(post)}>Delete Post</button>
                </div>
              )}

              {post.comments && (
                <article>
                  <p>Commments:</p>
                  <div>
                    {post.comments.map((comment, idx) => (
                      <div key={idx}>
                        <p>
                          {comment.authorOfCommentName} commented:
                          <i> {comment.text}</i>
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              )}
              <CommentItem
                authUser={authUser}
                post={post}
                commentPost={commentPost}
              />
              <hr />
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}

export default PostItem;
