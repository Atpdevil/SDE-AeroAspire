import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About This Website
      </Typography>
      <Typography sx={{ mb: 1 }}>
        This Task Manager is built with React + Vite + Material UI. Features:
      </Typography>
      <ul>
        <li>Routing (Home / Add Task / About)</li>
        <li>Tasks persisted in localStorage</li>
        <li>Search & filtering (status & priority)</li>
        <li>Light / Dark theme toggle (persisted)</li>
        <li>Polished UI and icons using MUI</li>
      </ul>
    </Container>
  );
}
