import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA54eWMz_RrPoxEOvUz-F_if1Hg_OoKvTs",
  authDomain: "itis-5166-final-project.firebaseapp.com",
  projectId: "itis-5166-final-project",
  storageBucket: "itis-5166-final-project.appspot.com",
  messagingSenderId: "645044054192",
  appId: "1:645044054192:web:26cd005054be8e06b77375",
  measurementId: "G-Z84GJWP2C5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;