import React from "react"
import {auth} from "../firebase"

// import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"

// import { auth } from "../firebase"

export default function Login() {
    const handleClick = () => {
        var provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        signInWithPopup(auth, provider).then(function (result) {
            // This gives you a Google Access Token.
            if (result) {
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
            }
        });
    }
    return (
        <div id='login-page'>
            <div id='login-card'>
                <h2>Welcome to Unichat!</h2>

                <button

                    className='login-button google'
                    onClick={() => handleClick()}
                >

                    {/* <GoogleOutlined />  */}
                    Sign In with Google
                </button>

                {/* <br/><br/> */}

                {/* <div
          className='login-button facebook'
          onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()) }
        >
          <FacebookOutlined /> Sign In with Facebook
        </div> */}
            </div>
        </div>
    )
}
