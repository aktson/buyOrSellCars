import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import { MdArrowForward, MdMailOutline } from "react-icons/md";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";


function ForgotPassword() {

    const [email, setEmail] = React.useState("");


    const handleSubmit = async () => {

        try {
            const auth = getAuth();

            await sendPasswordResetEmail(auth, email);
            toast.success("Email was sent")

        } catch (error) {
            toast.error("Could not sent reset email")
        }

    }
    return (
        <Card className="w-96 mx-auto mt-16 mb-4">
            <CardHeader className="mb-4 grid h-28 place-items-center bg-primary-medium" >
                <Typography variant="h3" color="white">
                    ForgotPassword
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-8 mb-6">
                <div className='flex'>
                    <Input
                        label="enter email address"
                        variant="standard"
                        color='teal'
                        id="email"
                        value={email}
                        icon={<MdMailOutline />}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
            </CardBody>
            <CardFooter className="pt-0 ">
                <Button fullWidth onClick={handleSubmit} className="bg-primary-dark"> Send Reset Link</Button>
                <Link to="/sign-in" className="flex justify-end items-center mt-4 text-secondary-light font-bold gap-1"> Sign In<MdArrowForward size={18} /></Link>
            </CardFooter>
        </Card>
    )
}

export default ForgotPassword