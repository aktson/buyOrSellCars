import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff, MdMailOutline } from "react-icons/md";
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button, IconButton } from "@material-tailwind/react";


function Login() {

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

    const handleSubmit = (event) => {
        event.preventDefault();

    }


    return (
        <Card className="w-96">
            <CardHeader
                className="mb-4 grid h-28 place-items-center bg-primary-medium"
            >
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
                        onChange={handleInputChange} />
                    <IconButton onClick={handleClickShowPassword} color="teal" variant="text" className='cursor-default hover:none'><MdMailOutline size={18} /></IconButton>
                </div>


                <div className='flex'>
                    <Input
                        label="password"
                        id="password"
                        color='teal'
                        variant="standard"
                        onChange={handleInputChange}
                        type={showPassword ? "text" : "password"}
                    />
                    <IconButton onClick={handleClickShowPassword} color="teal" variant="text" >
                        {showPassword ? <MdVisibility size={18} /> : <MdVisibilityOff size={18} />}
                    </IconButton>
                </div>


            </CardBody>
            <CardFooter className="pt-0">
                <Button className='bg-primary-medium' fullWidth>
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







// const handleClickShowPassword = () => {
//     setShowPassword((prevState) => !prevState)

// }

// return (

//     <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: "sm", padding: "2em" }} >
//         <Paper sx={{ padding: "2em" }} elevation={5} >
//             <form onSubmit={handleSubmit}>
//                 <Typography variant="h4" component="h1" marginBottom={2}>Login</Typography>
//                 <FormControl fullWidth variant="standard" sx={{ mb: 4, mt: 2 }}>
//                     <InputLabel htmlFor="email" >Email</InputLabel>
//                     <FilledInput
//                         id="email"
//                         value={email}
//                         onChange={handleInputChange}
//                         endAdornment={<InputAdornment position="end">
//                             <EmailIcon />
//                         </InputAdornment>}
//                     />
//                 </FormControl>
//                 <FormControl variant="standard" fullWidth sx={{ mb: 4, mt: 2 }}>
//                     <InputLabel htmlFor="password">Password</InputLabel>
//                     <FilledInput
//                         id="password"
//                         type={showPassword ? 'text' : 'password'}
//                         value={password}
//                         onChange={handleInputChange}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     edge="end"
//                                 >
//                                     {password.showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         }
//                         label="Password"
//                     />
//                 </FormControl>
//                 <Button variant='contained' color='primary' type='submit' size="large">Login</Button>
//                 <Link to="/forgot-password">Forgot password ?</Link>
//             </form>

//             {/* google OAuth */}
//             <Link to="/sign-up">Sign up Instead</Link>
//         </Paper>
//     </Container>




export default Login
