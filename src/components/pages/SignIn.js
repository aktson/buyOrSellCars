import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff, MdMailOutline } from "react-icons/md";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, IconButton, Button } from "@material-tailwind/react";
import { toast } from "react-toastify"
import GoogleOAuth from '../GoogleOAuth';
import ErrorSpan from '../ErrorSpan';

const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Please enter valid email address"),
    password: yup.string().required("Password is required").min(6, "Password must be atleast 6 characters")
})



function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState)

    }

    const handleFormSubmit = async (data) => {

        const { email, password } = data;
        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (userCredential.user) {
                navigate("/")
            }

        } catch (error) {
            toast.error("Bad user Credentials")

        }
    }

    return (
        <Card className="w-96 mx-auto mt-16 mb-4">
            <CardHeader className="mb-4 grid h-28 place-items-center bg-primary-medium" >
                <Typography variant="h3" color="white">
                    Sign In
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 mb-6">
                <div className='flex '>
                    <Input
                        {...register("email")}
                        label="email"
                        variant="standard"
                        color='teal'
                        id="email"
                    />
                    <IconButton onClick={handleClickShowPassword} color="teal" variant="text" className='icon-button text-dark'>
                        <MdMailOutline size={18} />
                    </IconButton>
                </div>
                {errors.email && <ErrorSpan message={errors.email.message} />}
                <div className='flex mt-5'>
                    <Input
                        {...register("password")}
                        label="password"
                        id="password"
                        color='teal'
                        variant="standard"

                        type={showPassword ? "text" : "password"}
                    />
                    <IconButton onClick={handleClickShowPassword} className="text-dark" variant="text" >
                        {showPassword ? <MdVisibility size={18} /> : <MdVisibilityOff size={18} />}
                    </IconButton>
                </div>
                {errors.password && <ErrorSpan message={errors.password.message} />}

            </CardBody>
            <CardFooter className="pt-0 ">
                <Button fullWidth onClick={handleSubmit(handleFormSubmit)} className="bg-primary-dark"> Sign In</Button>
                <p className='text-center my-2'>or</p>
                <GoogleOAuth />
                <Typography variant="small" className="mt-6 flex justify-center">
                    Don't have an account?
                    <Link to="/sign-up" className="ml-1 font-bold text-secondary-medium">Sign up</Link>
                </Typography>
                <Link to="/forgot-password" className=" text-sm text-secondary-medium flex  justify-center mt-2">Forgot Password?</Link>
            </CardFooter>
        </Card>
    );
}


export default SignIn
