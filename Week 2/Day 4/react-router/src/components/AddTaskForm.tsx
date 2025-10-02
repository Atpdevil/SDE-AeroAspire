import { useState, type JSX } from "react";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import { type Task } from "./TaskCard";

interface Props {
  onAddTask: (task: Task) => void;
}

export default function AddTaskForm({ onAddTask }: Props): JSX.Element {
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

  function validateForm() {
    const newErrors: typeof errors = {};
    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    if (!priority) newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) return;
    const newTask: Task = {
      id: 0,
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    setErrors({});
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
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
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
    </div>
  );
}
