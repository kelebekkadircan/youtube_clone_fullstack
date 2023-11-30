import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDlbAorMHlQZemZraaRYJ5F5tmiwCDF_nk",
    authDomain: "clone-95e53.firebaseapp.com",
    projectId: "clone-95e53",
    storageBucket: "clone-95e53.appspot.com",
    messagingSenderId: "280095952526",
    appId: "1:280095952526:web:190b9b3f72a7d77fb283df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


export default app;