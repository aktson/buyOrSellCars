import React from 'react'
import { Link, useNavigate } from "react-router-dom";


function Signup() {
    return <div> Signup</div>
    // const [showPassword, setShowPassword] = React.useState(false);

    // const [formdata, setFormdata] = React.useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // })

    // const { name, email, password } = formdata;
    // const navigate = useNavigate();


    // const handleSubmit = (event) => {
    //     event.preventDefault();

    // }

    // const handleInputChange = (e) => {
    //     setFormdata((prevState) => ({
    //         ...prevState,
    //         [e.target.id]: e.target.value
    //     }))
    // }

    // const handleClickShowPassword = () => {
    //     setShowPassword((prevState) => !prevState)

    // }

    // return (

    //     <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2em" }} >
    //         <Paper sx={{ padding: "2em" }} elevation={5} >
    //             <form onSubmit={handleSubmit}>
    //                 <Typography variant="h4" component="h1" marginBottom={2}>Sign Up</Typography>
    //                 <FormControl fullWidth variant="standard" sx={{ mb: 4, mt: 2 }}>
    //                     <InputLabel htmlFor="name" >Name</InputLabel>
    //                     <FilledInput
    //                         id="name"
    //                         type="text"
    //                         value={name}
    //                         onChange={handleInputChange}
    //                         endAdornment={<InputAdornment position="end">
    //                             <PersonIcon />
    //                         </InputAdornment>}
    //                     />
    //                 </FormControl>
    //                 <FormControl fullWidth variant="standard" sx={{ mb: 4, mt: 2 }}>
    //                     <InputLabel htmlFor="email" >Email</InputLabel>
    //                     <FilledInput
    //                         id="email"
    //                         type="email"
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
    //                 <Button variant='contained' color='primary' type='submit' size="large">Signup</Button>
    //             </form>

    //             {/* google OAuth */}
    //             <Link to="/login">Already User ? Sign in </Link>
    //         </Paper>
    //     </Container>


}

export default Signup;

