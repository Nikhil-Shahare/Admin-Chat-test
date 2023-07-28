import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth,db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";



const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
  

    try {
        const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
        console.log("userName: this the way its done")
        console.log(userCred)

        await setDoc(doc(db, "users", userCred.user.uid), {
            uid: userCred.user.uid,
            displayName : userCred.user.displayName,
            email:userCred.user.email,
            photoURL: userCred.user.photoURL,
          });

       await setDoc(doc(db, "userChats", userCred.user.uid), {});
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
       <button onClick={handleSubmit}>
        sign in with google
       </button>

      </div>
    </div>
  );
};

export default Login;
