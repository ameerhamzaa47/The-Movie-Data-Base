
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, addDoc} from "firebase/firestore";
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


// Add in list


// Function to add or remove movie from user's list (toggle functionality)
const toggleMovieInList = async (uid: string, movieId: string, listType: string) => {
  const movieRef = doc(db, "users", uid, listType, movieId);

  // Check if the movie is already in the list
  const movieDoc = await getDoc(movieRef);
  
  if (movieDoc.exists()) {
    // Movie exists, so we remove it
    await deleteDoc(movieRef);
    console.log("Removed from list");
  } else {
    // Movie doesn't exist, so we add it
    await setDoc(movieRef, { movieId, timestamp: new Date() });
    console.log("Added to list");
  }
};

// Function to check if movie is already in the list (for styling)
const isMovieInList = async (uid: string, movieId: string, listType: string) => {
  const movieRef = doc(db, "users", uid, listType, movieId);
  const movieDoc = await getDoc(movieRef);
  return movieDoc.exists();
};

export { toggleMovieInList, isMovieInList };



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
