import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'


export default function Header() {
return (
<AppBar position="static"  sx={{ backgroundColor: "#4caf50" }}>
<Toolbar>
<IconButton edge="start" color="inherit" aria-label="menu">
<MenuIcon />
</IconButton>
<Typography variant="h6" component="div" sx={{ backgroundColor: "#4caf50" }}>
My Vite React App
</Typography>
<Box>
<Typography variant="body2" component="span">v1.0</Typography>
</Box>
</Toolbar>
</AppBar>
)
}