import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff, MdMailOutline } from "react-icons/md";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button, IconButton } from "@material-tailwind/react";
import { toast } from "react-toastify"


function SignIn() {

    const navigate = useNavigate();


    const [showPassword, setShowPassword] = React.useState(false);
    const [formdata, setFormdata] = React.useState({
        email: "",
        password: ""
    })


    const { email, password } = formdata;
    const handleInputChange = (e) => {
        setFormdata((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState)

    }

    const handleSubmit = async () => {

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
            <CardBody className="flex flex-col gap-8 mb-6">
                <div className='flex'>
                    <Input
                        label="email"
                        variant="standard"
                        color='teal'
                        id="email"
                        value={email}
                        onChange={handleInputChange} />
                    <IconButton onClick={handleClickShowPassword} color="teal" variant="text" className='icon-button text-dark'>
                        <MdMailOutline size={18} />
                    </IconButton>
                </div>
                <div className='flex'>
                    <Input
                        label="password"
                        id="password"
                        value={password}
                        color='teal'
                        variant="standard"
                        onChange={handleInputChange}
                        type={showPassword ? "text" : "password"}
                    />
                    <IconButton onClick={handleClickShowPassword} className="text-dark" variant="text" >
                        {showPassword ? <MdVisibility size={18} /> : <MdVisibilityOff size={18} />}
                    </IconButton>
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button className='bg-primary-medium' fullWidth onClick={handleSubmit}>
                    Sign In
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                    Don't have an account?
                    <Link to="/sign-up" className="ml-1 font-bold text-secondary-medium">Sign up</Link>
                </Typography>
            </CardFooter>
        </Card>
    );
}


export default SignIn
