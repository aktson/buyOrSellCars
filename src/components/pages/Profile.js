import React from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { fireStoreDb } from "../../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import { Button, Input, Typography } from "@material-tailwind/react";
import { MdBorderColor, MdCheck } from "react-icons/md";
import { toast } from "react-toastify";


function Profile() {
    const auth = getAuth();


    const [changeDetails, setChangeDetails] = React.useState(false)

    const [formData, setFormData] = React.useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });


    const { name, email } = formData;


    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const handleSubmit = async () => {

        try {
            if (auth.currentUser.displayName !== name) {
                // update displayName in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name

                })
                // update in firestore
                const userRef = doc(fireStoreDb, "users", auth.currentUser.uid);
                await updateDoc(userRef, {
                    fullName: name
                })
                toast.success("name updated")

            }
        } catch (error) {
            toast.error("Coud not update profile details")
        }

    }

    return <section className='mt-8 '>
        <div className='shadow-xl max-w-2xl mx-auto p-8'>
            <Typography variant="h2" className="text-center ">My Profile</Typography>
            <div className='flex justify-between'>
                <Typography variant="h3">Personal Details</Typography>
                <Button variant="text" onClick={() => {
                    changeDetails && handleSubmit()
                    setChangeDetails((prevState) => !prevState)
                }}>
                    {!changeDetails ?
                        <MdBorderColor size={24} className="text-primary-dark" />
                        : <MdCheck size={24} />}
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='my-6'>
                    <Input variant="standard" label="Name" color="teal" id="name" value={name} onChange={handleInputChange} disabled={!changeDetails} />
                </div>
                <div className='my-6'>
                    <Input variant="standard" label="Email" color="teal" id='email' value={email} disabled />
                </div>
            </form>
        </div>
    </section>
}

export default Profile