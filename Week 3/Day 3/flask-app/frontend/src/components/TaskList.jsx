import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/task";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks();
        setTasks(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e);
      }
    })();
  }, []);

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (e) {
      setErr(e);
    }
  };

  if (err) return <div style={{color:"red"}}>Error: {JSON.stringify(err)}</div>;
  return (
    <div>
      {tasks.length === 0 ? <p>No tasks</p> : tasks.map(t => (
        <div key={t.id} style={{border:"1px solid #ccc", padding:"6px", margin:"6px 0"}}>
          <strong>{t.title}</strong><div>{t.description}</div>
          <div>Completed: {String(t.completed)}</div>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
