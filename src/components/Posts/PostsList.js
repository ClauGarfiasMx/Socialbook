import React, { Component } from "react";
import PostItem from "./PostItem";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import Loader from "react-loader-spinner";

class PostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      incomingPosts: [],
      limit: 5
    };
  }

  onListenForPosts = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .posts()
      .orderBy("createdAt", "desc")
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let incomingPosts = [];
          snapshot.forEach(doc =>
            incomingPosts.push({ ...doc.data(), uid: doc.id })
          );

          this.setState({
            incomingPosts: incomingPosts,
            loading: false
          });
        } else {
          this.setState({ incomingPosts: null, loading: false });
        }
      });
  };

  editPost = (post, images, text) => {
    const { uid, ...postSnapshot } = post;

    this.props.firebase.post(post.uid).update({
      ...postSnapshot,
      editedAt: new Date(),
      images,
      text
    });
  };

  bookIt = post => {
    this.props.firebase
      .post(post.uid)
      .set(
        {
          bookIt: post.bookIt + 1
        },
        { merge: true }
      )

      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  commentPost = (post, comment) => {
    this.props.firebase.db
      .runTransaction(transaction => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(this.props.firebase.post(post.uid)).then(doc => {
          if (!doc.data().comments) {
            transaction.set({
              comments: [comment]
            });
          } else {
            const comments = doc.data().comments;
            comments.push(comment);
            transaction.update(this.props.firebase.post(post.uid), {
              comments: comments
            });
          }
        });
      })
      .then(function() {
        console.log("Transaction successfully committed!");
      })
      .catch(function(error) {
        console.log("Transaction failed: ", error);
      });
  };

  deletePost = post => {
    this.props.firebase
      .post(post.uid)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  componentDidMount() {
    this.onListenForPosts();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onNextPage = () => {
    this.setState(state => ({ limit: state.limit + 5 }), this.onListenForPosts);
  };

  render() {
    const { incomingPosts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h2>Recent Posts</h2>

            {loading && (
              <div>
                <Loader type="CradleLoader" />
              </div>
            )}

            {!loading && incomingPosts && (
              <div>
                {this.state.incomingPosts.map(post => (
                  <PostItem
                    authUser={authUser}
                    bookIt={this.bookIt}
                    commentPost={this.commentPost}
                    deletePost={this.deletePost}
                    editPost={this.editPost}
                    incomingPosts={this.state.incomingPosts}
                    post={post}
                    key={post.uid}
                  />
                ))}

                <button type="button" onClick={this.onNextPage}>
                  More Post
                </button>
              </div>
            )}

            {!incomingPosts && <div>Sorry, there are no posts... yet.</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(PostsList);
