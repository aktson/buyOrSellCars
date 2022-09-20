import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { fireStoreDb } from "../firebase.config";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Button } from '@material-tailwind/react';

function GoogleOAuth() {

    const navigate = useNavigate();
    const location = useLocation();


    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;


            // check for user
            const docRef = doc(fireStoreDb, "users", user.uid)
            const docSnap = await getDoc(docRef);

            // if user doesnt exist then create user
            if (!docSnap.exists()) {
                await setDoc(doc(fireStoreDb, "users", user.uid), {
                    fullName: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()

                })
            }
            navigate("/")


        } catch (error) {
            toast.error("Could not authorize with google")
        }

    }

    return (
        <Button className='flex justify-center items-center my-2 p-2' fullWidth variant="outlined" color='teal'>
            Sign {location.pathname === "/sign-in" ? "In" : "Up"} with
            <FcGoogle size={18} className="cursor-pointer ml-2" onClick={onGoogleClick} />
        </Button>
    )
}

export default GoogleOAuth