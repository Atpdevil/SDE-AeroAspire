import React, { useState } from "react";
import TaskList from "./components/TaskList";
import NewTaskForm from "./components/NewTaskForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{maxWidth:800, margin:"20px auto"}}>
      <h1>Tasks</h1>
      <NewTaskForm onCreated={() => setRefreshKey(k => k + 1)} />
      {/* Re-mount TaskList when refreshKey changes to reload tasks */}
      <TaskList key={refreshKey} />
    </div>
  );
}

export default App;
