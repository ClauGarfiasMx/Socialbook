import React, { Component } from "react";
import UploadImage from "./UploadImage";
import CommentItem from "./CommentItem";
import {
  ImageFromPost,
  TextArea,
  PostItemContainer,
  FlexRowDiv,
  MonoSpaceP
} from "./stylesPostItem";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.post.text,
      error: null,
      images: this.props.post.images
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.editPost = this.editPost.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
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

  uploadImage(images) {
    this.setState({ images: images });
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
    const { editMode, editText } = this.state;
    return (
      <PostItemContainer>
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
              <React.Fragment>
                <UploadImage
                  uploadImage={this.uploadImage}
                  buttonLabel={"Change Image"}
                  editMode={this.state.editMode}
                  deleteImage={this.deleteImage}
                  imageUrl={this.state.images.imageUrl}
                />
              </React.Fragment>
            )}

            {!post.images.imageUrl && (
              <React.Fragment>
                <UploadImage
                  uploadImage={this.uploadImage}
                  buttonLabel={"Upload Image"}
                  editMode={this.state.editMode}
                  deleteImage={this.deleteImage}
                  imageUrl={this.state.images.imageUrl}
                />
              </React.Fragment>
            )}

            <button
              onClick={() => {
                console.log(this.state);
                this.saveEdit();
              }}
            >
              Update Post
            </button>
            <button onClick={this.cancelEdit}>Cancel</button>
            <hr />
          </div>
        ) : (
          incomingPosts && (
            <div>
              <div>
                <MonoSpaceP light>
                  <strong>{post.username}</strong>
                  <span>
                    {" "}
                    shared on{" "}
                    {post.createdAt
                      .toDate()
                      .toString()
                      .slice(0, 10)}{" "}
                    at{" "}
                    {post.createdAt
                      .toDate()
                      .toLocaleString()
                      .slice(-9, -1)}
                    {post.editedAt && <i> (Edited) </i>}:
                  </span>
                </MonoSpaceP>
              </div>
              <FlexRowDiv>
                <MonoSpaceP>
                  <span>{post.text} </span>
                </MonoSpaceP>{" "}
                <ImageFromPost>
                  <img src={post.images.imageUrl} />
                </ImageFromPost>
              </FlexRowDiv>
              <p>
                <span role="img" aria-label="Books">
                  📚
                </span>{" "}
                Bookits: {post.bookIt}
              </p>
              <button onClick={() => bookIt(post)}>
                <span role="img" aria-label="Book">
                  I 📖 it!
                </span>{" "}
              </button>
              {authUser.uid === post.authorID && (
                <div>
                  <button onClick={this.editPost}>Edit Post</button>
                  <button onClick={() => deletePost(post)}>Delete Post</button>
                </div>
              )}

              {post.comments && (
                <article>
                  <p>Comments:</p>
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
            </div>
          )
        )}
      </PostItemContainer>
    );
  }
}

export default PostItem;
