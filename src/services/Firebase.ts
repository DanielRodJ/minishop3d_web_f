import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAoKG1lK2ilkAltmLZk6j8h6PPYkKfcChA",
  authDomain: "minisho3dweb.firebaseapp.com",
  projectId: "minisho3dweb",
  storageBucket: "minisho3dweb.firebasestorage.app",
  messagingSenderId: "946531940301",
  appId: "1:946531940301:web:99d38ea2128c838b1cf684"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);