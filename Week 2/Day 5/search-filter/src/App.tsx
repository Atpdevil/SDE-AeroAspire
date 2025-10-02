import { useEffect, useMemo, useState, type JSX } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import About from "./pages/About";

import type { Task, NewTask } from "./components/TaskCard";

const STORAGE_KEY = "tasks_v1";
const THEME_KEY = "theme_mode_v1";

const defaultTasks: Task[] = [
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
  {
    id: 3,
    title: "Write README",
    description: "Add setup, running instructions and screenshots",
    dueDate: "2025-10-10",
    priority: "Low",
    completed: false,
  },
];

export default function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultTasks
  );

  // theme mode persistence
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
          },
        },
      }),
    [mode]
  );

  function toggleCompletion(id: number) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function addTask(newTask: NewTask) {
    setTasks((prev) => [{ ...newTask, id: Date.now() }, ...prev]); // newest first
  }

  function toggleTheme() {
    setMode((m) => (m === "light" ? "dark" : "light"));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home tasks={tasks} onToggle={toggleCompletion} />} />
        <Route path="/add" element={<AddTask addTask={addTask} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}
