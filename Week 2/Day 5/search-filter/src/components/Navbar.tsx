import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import AddTaskIcon from "@mui/icons-material/AddTask";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ mode, toggleTheme }: Props) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          Task Manager
        </Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            size="small"
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/add"
            startIcon={<AddTaskIcon />}
            size="small"
          >
            Add Task
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/about"
            startIcon={<InfoIcon />}
            size="small"
          >
            About
          </Button>

          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
