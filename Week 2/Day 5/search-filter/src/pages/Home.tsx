import { useMemo, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskCard, { type Task } from "../components/TaskCard";

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
}

export default function Home({ tasks, onToggle }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | "Completed" | "Pending">("All");
  const [priority, setPriority] = useState<"All" | "High" | "Medium" | "Low">(
    "All"
  );

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return tasks
      .filter((t) => {
        if (s) {
          const combined = (t.title + " " + t.description).toLowerCase();
          if (!combined.includes(s)) return false;
        }
        if (status === "Completed" && !t.completed) return false;
        if (status === "Pending" && t.completed) return false;
        if (priority !== "All" && t.priority !== priority) return false;
        return true;
      })
      .sort((a, b) =>
        a.dueDate > b.dueDate ? 1 : a.dueDate < b.dueDate ? -1 : 0
      );
  }, [tasks, search, status, priority]);

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setPriority("All");
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 240, flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          sx={{ width: 160 }}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        <TextField
          select
          size="small"
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          sx={{ width: 140 }}
        >
          <MenuItem value="All">All Priority</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <Button variant="outlined" size="small" onClick={clearFilters}>
          Clear
        </Button>
      </Box>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Showing {filtered.length} of {tasks.length} tasks
      </Typography>

      {/* Task List without Grid */}
      <section aria-live="polite" style={{ marginTop: "1rem" }}>
        {filtered.length === 0 ? (
          <Typography>
            No tasks match your filters. Try clearing filters or add new tasks.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {filtered.map((task) => (
              <TaskCard key={task.id} {...task} onToggle={() => onToggle(task.id)} />
            ))}
          </Stack>
        )}
      </section>
    </Container>
  );
}
