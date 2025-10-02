import { type JSX } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  Chip,
  Box,
} from "@mui/material";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: "High" | "Medium" | "Low" | string;
  completed: boolean;
}

export type NewTask = Omit<Task, "id">;

interface Props extends Task {
  onToggle: () => void;
}

function formatDate(d: string) {
  try {
    // ensure consistent parse for YYYY-MM-DD
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString();
  } catch {
    return d;
  }
}

export default function TaskCard({
  title,
  description,
  dueDate,
  priority,
  completed,
  onToggle,
}: Props): JSX.Element {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: completed ? "action.selected" : "background.paper",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 1,
          }}
        >
          <FormControlLabel
            control={<Checkbox checked={completed} onChange={onToggle} />}
            label={
              <Typography variant="h6" sx={{ textDecoration: completed ? "line-through" : "none" }}>
                {title}
              </Typography>
            }
            sx={{ mr: "auto" }}
          />

          <Chip
            label={priority}
            size="small"
            sx={{
              ml: 1,
              bgcolor: priority === "High" ? "error.main" : priority === "Medium" ? "warning.main" : priority === "Low" ? "info.main" : "default",
              color: "#000000ff",
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="body2">Due: {formatDate(dueDate)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
