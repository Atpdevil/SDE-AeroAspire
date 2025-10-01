import React, { useState, type JSX } from 'react'
import TaskCard, { type Task } from './components/TaskCard'

export default function App(): JSX.Element {
const initialTasks: Task[] = [
{
id: 1,
title: 'Setup React with Vite',
description: "create homepage with MUI Typography and AppBar",
dueDate: '2025-09-29',
priority: 'High',
completed: false,
},
{
id: 2,
title: 'React Components & Props',
description: "TaskCard component;Render list of dummy tasks via props",
dueDate: '2025-10-02',
priority: 'Medium',
completed: true,
},
{
id: 3,
title: 'Write README',
description: "Add setup, running instructions and screenshots",
dueDate: '2025-10-10',
priority: 'Low',
completed: false,
},
]

const [tasks, setTasks] = useState<Task[]>(initialTasks)

function toggleCompletion(id: number) {
setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
}

return (
<main className="app">
<h1 className="heading">Task List Component using TypeScript</h1>

<section className="task-list" aria-live="polite">
{tasks.map(task => (
<TaskCard key={task.id} {...task} onToggle={() => toggleCompletion(task.id)} />
))}
</section>
</main>
)
}