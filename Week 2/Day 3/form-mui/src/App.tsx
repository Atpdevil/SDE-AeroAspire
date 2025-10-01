import { useState, type JSX } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import TaskCard, { type Task } from "./components/TaskCard.tsx";

export default function App(): JSX.Element {
  const initialTasks: Task[] = [
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

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: string;
  }>({});

  function toggleCompletion(id: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  

  function validateForm() {
    const newErrors: typeof errors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    if (!priority) newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleAddTask() {
    if (!validateForm()) return;

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    setErrors({});
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Manager with TaskCard
      </Typography>

      {/* Form Section */}
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!errors.dueDate}
        helperText={errors.dueDate}
      />
      <TextField
        label="Priority"
        select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.priority}
        helperText={errors.priority}
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>

      {/* Task List */}
      <section className="task-list" aria-live="polite" style={{ marginTop: "2rem" }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onToggle={() => toggleCompletion(task.id)}
          />
        ))}
      </section>
    </Container>
  );
}
