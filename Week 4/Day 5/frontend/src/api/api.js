import axios from "axios";

const API_BASE = "http://127.0.0.1:5000/api";

export const getTasks = async () => {
  try {
    const res = await axios.get(`${API_BASE}/tasks`);
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
