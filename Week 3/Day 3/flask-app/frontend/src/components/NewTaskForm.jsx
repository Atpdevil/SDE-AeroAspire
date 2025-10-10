import React, { useState } from "react";
import { createTask } from "../api/task.js";

export default function NewTaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError("Title required");
    setSaving(true);
    try {
      const task = await createTask({ title: title.trim(), description: description.trim(), completed: false });
      setTitle(""); setDescription("");
      if (onCreated) onCreated(task);
    } catch (err) {
      if (err && err.body && err.body.errors) setError(JSON.stringify(err.body.errors));
      else setError(err?.body?.message || "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
      </div>
      <div>
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"/>
      </div>
      <div>
        <button disabled={saving} type="submit">Create</button>
      </div>
      {error && <div style={{color:"red"}}>{error}</div>}
    </form>
  );
}
