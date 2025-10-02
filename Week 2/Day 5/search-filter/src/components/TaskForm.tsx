import { useState } from "react";
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";
import type { NewTask } from "./TaskCard";

interface Props {
  addTask: (task: NewTask) => void;
  onAfterAdd?: () => void;
}

export default function TaskForm({ addTask, onAfterAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    if (!priority) newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) return;
    const newTask: NewTask = {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      completed: false,
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    setErrors({});
    if (onAfterAdd) onAfterAdd();
  }

  return (
    <Box>
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
        multiline
        minRows={2}
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

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Add Task
      </Button>
    </Box>
  );
}
