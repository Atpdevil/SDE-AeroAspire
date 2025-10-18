import React, { useEffect, useState } from "react";
import { getTasks } from "../api/api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();
        if (data.message === "No tasks found") {
          setTasks([]);
        } else {
          setTasks(data);
        }
      } catch (err) {
        setError("Unable to load tasks. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (tasks.length === 0) return <p>No tasks available</p>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
