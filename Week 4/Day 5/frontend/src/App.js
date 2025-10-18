import React from "react";
import TaskList from "./components/TaskList";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <TaskList />
      </ErrorBoundary>
    </div>
  );
}

export default App;
