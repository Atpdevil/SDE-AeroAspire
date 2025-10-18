import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getTasks();
      if (data.error) {
        setError(data.error);
      } else if (data.message) {
        setError(data.message);
      } else {
        setTasks(data);
      }
    })();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? <p>No tasks found.</p> :
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.title} - {task.description}
            </li>
          ))}
        </ul>}
    </div>
  );
}

export default TaskList;
