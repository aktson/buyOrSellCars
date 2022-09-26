import React from 'react';
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff, MdMailOutline, MdPersonOutline } from "react-icons/md";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button, IconButton } from "@material-tailwind/react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { fireStoreDb } from "../../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { toast } from 'react-toastify';
import GoogleOAuth from '../GoogleOAuth';
import ErrorSpan from '../ErrorSpan';

const schema = object({
    fullName: string().required("Fullname is required"),
    email: string().required("Email is required").email("Please enter valid email address"),
    password: string().required("Password is required").min(6, "Password must be atleast 6 characters")

});
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = React.useState(false);
    // const [formdata, setFormdata] = React.useState({
    //     fullName: "",
    //     email: "",
    //     password: ""
    // })

    // const { fullName, email, password } = formdata;
    // const handleInputChange = (e) => {
    //     setFormdata((prevState) => ({
    //         ...prevState,
    //         [e.target.id]: e.target.value
    //     }))
    // }

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState)

    }

    const handleFormSubmit = async (data) => {
        const { fullName, email, password } = data;

        try {

            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: fullName
            })
            navigate("/")

            // save user to firestore
            const formDataCopy = { ...data }
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(fireStoreDb, "users", user.uid), formDataCopy)


        } catch (error) {
            toast.error("Something went wrong with registration")
        }


    }


    return (

        <Card className="w-96 mt-16 mb-4 mx-auto">
            <CardHeader className="mb-4 grid h-28 place-items-center bg-primary-medium">
                <Typography variant="h3" color="white">
                    Sign Up
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 mb-6">
                <div className='flex'>
                    <Input
                        label="full name"
                        variant="standard"
                        color='teal'
                        {...register("fullName")}
                    />
                    <IconButton onClick={handleClickShowPassword} variant="text" className='icon-button text-dark'>
                        <MdPersonOutline size={18} />
                    </IconButton>
                </div>
                {errors.fullName && <ErrorSpan message={errors.fullName.message} />}

                <div className='flex mt-2'>
                    <Input
                        label="email"
                        variant="standard"
                        color='teal'
                        {...register("email")}
                    />
                    <IconButton onClick={handleClickShowPassword} variant="text" className='icon-button text-dark'>
                        <MdMailOutline size={18} />
                    </IconButton>
                </div>
                {errors.email && <ErrorSpan message={errors.email.message} />}

                <div className='flex mt-2'>
                    <Input
                        label="password"

                        color='teal'
                        variant="standard"
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                    />
                    <IconButton onClick={handleClickShowPassword} variant="text" className='text-dark' >
                        {showPassword ? <MdVisibility size={18} /> : <MdVisibilityOff size={18} />}
                    </IconButton>
                </div>
                {errors.password && <ErrorSpan message={errors.password.message} />}

            </CardBody>

            <CardFooter className="pt-0">
                <Button className='bg-primary-medium' fullWidth onClick={handleSubmit(handleFormSubmit)}>
                    Sign Up
                </Button>
                <p className='text-center my-2'>or</p>
                <GoogleOAuth />
                <Typography variant="small" className="mt-6 flex justify-center">
                    Already have an account?
                    <Link to="/sign-in" className="ml-1 font-bold text-secondary-medium">Sign in </Link>
                </Typography>
            </CardFooter>

        </Card >

    );
}


export default Login