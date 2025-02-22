import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    // HELPER
    this.fieldValue = app.firestore.FieldValue;
    // FIREBASE API'S
    this.auth = app.auth(); // *** Instantiate Firebase AUTH ***
    this.db = app.firestore();
  }
  // *** Firebase AUTH API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });

  activeUser = {};
  //  If the user is not null, we will get the database user with the help of the authenticated user’s unique identifier,
  //  and then we merge everything from the database user with the unique identifier and email from the authenticated user.

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // console.log(authUser);
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            // console.log(dbUser);

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };
            this.activeUser = authUser;

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection("users");

  // *** User API ***
  message = uid => this.db.doc(`messages/${uid}`);
  messages = () => this.db.collection("messages");

  post = uid => this.db.doc(`posts/${uid}`);
  posts = () => this.db.collection("posts");
}

export default Firebase;
