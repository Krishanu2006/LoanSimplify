import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdZ21IKBOnlUkCj5IlXnfzQeRLhz4BZFE",
  authDomain: "status-code-d2f75.firebaseapp.com",
  projectId: "status-code-d2f75",
  storageBucket: "status-code-d2f75.appspot.com",
  messagingSenderId: "460974939953",
  appId: "1:460974939953:web:826be126065f0135075a10",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Logout function
const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
      // Optional: redirect user to login
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Logout error: ", error);
    });
};

export { auth, provider, db, storage, logout };