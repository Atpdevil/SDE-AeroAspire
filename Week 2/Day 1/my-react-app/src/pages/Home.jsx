import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'


export default function Home() {
return (
<div>
<Typography variant="h3" component="h1" gutterBottom>
Welcome to your Vite + React + MUI Homepage
</Typography>


<Typography variant="body1" paragraph>
This page is a simple starting point that uses Material UI Typography and an AppBar header.
</Typography>


<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
<Button variant="contained">Get Started</Button>
<Button variant="outlined">Learn More</Button>
</Stack>
</div>
)
}