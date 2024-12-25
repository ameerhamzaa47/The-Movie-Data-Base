// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, arrayUnion, arrayRemove} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRnlYjTO5lcHsBFPesnX_VOc1nmAXkxPw",
  authDomain: "the-cinemania-auth.firebaseapp.com",
  projectId: "the-cinemania-auth",
  storageBucket: "the-cinemania-auth.firebasestorage.app",
  messagingSenderId: "531716254386",
  appId: "1:531716254386:web:6741149384bae4786ff7ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, setDoc, doc };

// Function to add a comment for the logged-in user
const addCommentToFirestore = async (uid: string, commentText: string) => {
  if (!uid || !commentText) return;

  try {
    const db = getFirestore();
    const commentsRef = collection(db, "users", uid, "comments");
    await addDoc(commentsRef, {
      text: commentText,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error adding comment: ", error);
  }
};

export { addCommentToFirestore };


// Function to add a movie to a specific category (watchlist, favorites, or lists)
const toggleMovieInFirestore = async (uid: string, movieId: string, category: string, isAdded: boolean) => {
  if (!uid || !movieId || !category) return;

  try {
    const userMoviesRef = doc(db, "users", uid);  // Reference to the user's document
    const userDoc = await getDoc(userMoviesRef);

    // If the user document doesn't exist, create it with empty arrays for categories
    if (!userDoc.exists()) {
      await setDoc(userMoviesRef, { [category]: [] });
    }

    // Add or remove the movie based on the current state (isAdded)
    await setDoc(
      userMoviesRef,
      {
        [category]: isAdded ? arrayRemove(movieId) : arrayUnion(movieId), // Toggle logic
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error toggling movie in Firestore:", error);
  }
};

export { toggleMovieInFirestore };




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore, doc, setDoc, collection, addDoc} from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCRnlYjTO5lcHsBFPesnX_VOc1nmAXkxPw",
//   authDomain: "the-cinemania-auth.firebaseapp.com",
//   projectId: "the-cinemania-auth",
//   storageBucket: "the-cinemania-auth.firebasestorage.app",
//   messagingSenderId: "531716254386",
//   appId: "1:531716254386:web:6741149384bae4786ff7ab"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// let db = getFirestore(app);

// export { auth, db, createUserWithEmailAndPassword, setDoc, doc };

// // Function to add a comment for the logged-in user
// const addCommentToFirestore = async (uid: string, commentText: string) => {
//   if (!uid || !commentText) return;

//   try {
//     const db = getFirestore();
//     const commentsRef = collection(db, "users", uid, "comments");
//     await addDoc(commentsRef, {
//       text: commentText,
//       timestamp: new Date(),
//     });
//   } catch (error) {
//     console.error("Error adding comment: ", error);
//   }
// };

// export { addCommentToFirestore };