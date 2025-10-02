import { useState, useEffect, type JSX } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import TaskCard, { type Task } from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
});

export default function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([
        {
          id: 1,
          title: "Setup React with Vite",
          description: "Create homepage with MUI Typography and AppBar",
          dueDate: "2025-09-29",
          priority: "High",
          completed: false,
        },
        {
          id: 2,
          title: "React Components & Props",
          description: "TaskCard component; Render list of dummy tasks via props",
          dueDate: "2025-10-02",
          priority: "Medium",
          completed: true,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function toggleCompletion(id: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function addTask(newTask: Task) {
    setTasks((prev) => [...prev, { ...newTask, id: prev.length + 1 }]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add Task
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Typography variant="h4" gutterBottom>
                  My Tasks
                </Typography>
                {tasks.length === 0 ? (
                  <Typography>No tasks yet. Add one!</Typography>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      {...task}
                      onToggle={() => toggleCompletion(task.id)}
                    />
                  ))
                )}
              </>
            }
          />

          {/* Add Task Page */}
          <Route
            path="/add"
            element={<AddTaskForm onAddTask={addTask} />}
          />

          {/* About Page */}
          <Route
            path="/about"
            element={
              <Typography variant="h5">
                This is a simple Task Manager built with React, MUI, and React Router.
              </Typography>
            }
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
