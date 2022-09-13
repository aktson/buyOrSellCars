import React from 'react'

function Signup() {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

    }
    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: "sm", padding: "2em" }} >
            <Paper sx={{ padding: "2em" }} elevation={5} >
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" component="h1">Sign up</Typography>
                    <TextField fullWidth label="name" id="name" sx={{ my: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField fullWidth label="email" id="email" type="email" sx={{ my: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField fullWidth label="password" id="password" type="password" sx={{ my: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant='contained' color='primary' type='submit' size="large">Sign Up</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Signup