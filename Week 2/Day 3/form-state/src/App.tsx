import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<number | "">("");
  const [errors, setErrors] = useState<{ title?: string; description?: string; priority?: string }>({});

  useEffect(() => {
    const dummyTasks: Task[] = [
      { id: 1, title: "Sample Task 1", description: "This is a dummy task", priority: 1, completed: false },
      { id: 2, title: "Sample Task 2", description: "Another dummy task", priority: 2, completed: false },
    ];
    setTasks(dummyTasks);
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (description.length > 100) newErrors.description = "Description too long";
    if (priority === "" || priority < 1 || priority > 5) newErrors.priority = "Priority must be 1-5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = () => {
    if (!validateForm()) return;

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      priority: Number(priority),
      completed: false,
    };
    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setPriority("");
    setErrors({});
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Task Manager
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
        label="Priority (1-5)"
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        fullWidth
        margin="normal"
        error={!!errors.priority}
        helperText={errors.priority}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        style={{ marginTop: "1rem" }}
      >
        Add Task
      </Button>

      <List style={{ marginTop: "2rem" }}>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <FormControlLabel
              control={
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
              }
              label={
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.title} (Priority: {task.priority}) - {task.description}
                </span>
              }
            />
            <Button
              color="secondary"
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "auto" }}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
