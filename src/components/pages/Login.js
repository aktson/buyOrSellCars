import React from 'react'
import { Typography, Container, Paper, Button, TextField } from '@mui/material';

function Login() {

    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: "sm", padding: "2em" }} >
            <Paper sx={{ padding: "2em" }} elevation={5} >
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" component="h1">Login</Typography>
                    <TextField fullWidth label="username" id="username" sx={{ my: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField fullWidth label="password" id="password" type="password" sx={{ my: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant='contained' color='primary' type='submit' size="large">Submit</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Login