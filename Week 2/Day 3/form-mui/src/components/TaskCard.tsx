import { type JSX } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface Props extends Task {
  onToggle: () => void;
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
      sx={{ mb: 2, backgroundColor: completed ? "#f0f0f0" : "white" }}
    >
      <CardContent>
        <FormControlLabel
          control={<Checkbox checked={completed} onChange={onToggle} />}
          label={
            <Typography
              variant="h6"
              sx={{ textDecoration: completed ? "line-through" : "none" }}
            >
              {title}
            </Typography>
          }
        />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">Due: {dueDate}</Typography>
        <Typography variant="body2">Priority: {priority}</Typography>
      </CardContent>
    </Card>
  );
}
