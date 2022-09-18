import React from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const onLogout = () => {
        auth.signOut();
        navigate("/")
    }

    return <>My Profile</>
}

export default Profile