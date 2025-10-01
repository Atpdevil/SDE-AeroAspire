import React from 'react'
export type Priority = 'Low' | 'Medium' | 'High'

export interface Task {
id: number
title: string
description?: string
dueDate?: string
priority?: Priority
completed?: boolean
}

type TaskCardProps = Task & {
onToggle: () => void
}

export default function TaskCard({ id, title, description, dueDate, priority = 'Low', completed = false, onToggle }: TaskCardProps) {
const formattedDue = dueDate ? new Date(dueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

return (
<article className={`task-card ${completed ? 'completed' : ''}`} aria-labelledby={`task-title-${id}`}>
<div className="task-left">
<h2 id={`task-title-${id}`} className="task-title">{title}</h2>
{description ? <p className="task-desc">{description}</p> : null}
</div>

<div className="task-right">
<div className="meta">
<div><strong>Due:</strong> <span>{formattedDue}</span></div>
<div><strong>Priority:</strong> <span>{priority}</span></div>
</div>

<button
className="toggle-btn"
onClick={onToggle}
aria-pressed={completed}
aria-label={completed ? `Mark ${title} as incomplete` : `Mark ${title} as complete`}
>
{completed ? '✓ Done' : 'Mark Done'}
</button>
</div>
</article>
)
}