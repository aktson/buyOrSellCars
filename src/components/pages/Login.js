import React from 'react'
import { Typography, Container, Paper, Button, FilledInput, FormControl, InputAdornment } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import InputLabel from '@mui/material/InputLabel';

function Login() {

    const [showPassword, setShowPassword] = React.useState(false);

    const [formdata, setFormdata] = React.useState({
        email: "",
        password: ""
    })

    const { email, password } = formdata;
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const handleInputChange = (e) => {
        setFormdata((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState)

    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: "sm", padding: "2em" }} >
            <Paper sx={{ padding: "2em" }} elevation={5} >
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" component="h1" marginBottom={2}>Login</Typography>
                    <FormControl fullWidth variant="standard" sx={{ mb: 4, mt: 2 }}>
                        <InputLabel htmlFor="email" >Email</InputLabel>
                        <FilledInput
                            id="email"
                            value={email}
                            onChange={handleInputChange}
                            endAdornment={<InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>}
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ mb: 4, mt: 2 }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <FilledInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {password.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button variant='contained' color='primary' type='submit' size="large">Login</Button>
                    <Link to="/forgot-password">Forgot password ?</Link>
                </form>

                {/* google OAuth */}
                <Link to="/sign-up">Sign up Instead</Link>
            </Paper>
        </Container>
    )
}

export default Login

{/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}