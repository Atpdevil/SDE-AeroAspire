import { Container } from "@mui/material";
import TaskForm from "../components/TaskForm";
import type { NewTask } from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

interface Props {
  addTask: (task: NewTask) => void;
}

export default function AddTask({ addTask }: Props) {
  const navigate = useNavigate();

  function handleAfterAdd() {
    navigate("/");
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <TaskForm addTask={addTask} onAfterAdd={handleAfterAdd} />
    </Container>
  );
}
