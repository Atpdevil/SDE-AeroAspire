const API_BASE = "http://127.0.0.1:5000";

async function parseJSONSafe(res) {
  if (res.status === 204) return null;
  const txt = await res.text();
  try { return txt ? JSON.parse(txt) : null; } catch { return txt; }
}

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  const body = await parseJSONSafe(res);
  if (!res.ok) throw { status: res.status, body };
  return body;
}

export async function createTask(payload) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const body = await parseJSONSafe(res);
  if (!res.ok) throw { status: res.status, body };
  return body;
}

export async function updateTask(id, payload) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const body = await parseJSONSafe(res);
  if (!res.ok) throw { status: res.status, body };
  return body;
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
  if (res.status === 204) return null;
  const body = await parseJSONSafe(res);
  if (!res.ok) throw { status: res.status, body };
  return body;
}
