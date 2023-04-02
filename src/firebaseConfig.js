// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyAReRt09e4anp0lYLVme1usmPSDmIE9-m8",
  authDomain: "streaming-app-uploads.firebaseapp.com",
  projectId: "streaming-app-uploads",
  storageBucket: "streaming-app-uploads.appspot.com",
  messagingSenderId: "592991597468",
  appId: "1:592991597468:web:5fd93a112a4df8ef500e59",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
