import React, { Component } from "react";
const INITIAL_STATE = {
  authorOfCommentID: "",
  authorOfCommentName: "",
  text: ""
};
class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onChangeComment = this.onChangeComment.bind(this);
  }
  onChangeComment(event) {
    this.setState({
      authorOfCommentID: this.props.authUser.uid,
      authorOfCommentName: this.props.authUser.username,
      commentedAt: new Date(),
      text: event.target.value
    });
    console.log(this.state);
  }
  onPostComment(post) {
    this.props.commentPost(post, this.state);
    this.setState({
      ...INITIAL_STATE
    });
  }
  render() {
    return (
      <article>
        What do you think?
        <input onChange={this.onChangeComment} value={this.state.text} />
        <button
          onClick={() => {
            this.onPostComment(this.props.post);
          }}
        >
          Comment
        </button>
      </article>
    );
  }
}

export default CommentItem;

// class CommentItem extends Component {
//   state = {
//     authorOfCommentID: "",
//     authorOfCommentName: "",
//     text: ""
//   };
//   onChangeComment(/*authID, authName,*/ event) {
//     this.setState({
//       /* authorOfCommentID: authID,
//       authorOfCommentName: authName,*/
//       text: event.target.value
//     });
//   }
//   render() {
//     const { authUser } = this.props;
//     return (
//       <article>
//         What do you think?
//         <input onChange={this.onChangeComment} value={this.state.text} />
//         <button>Comment</button>
//       </article>
//     );
//   }
// }

// export default CommentItem;
