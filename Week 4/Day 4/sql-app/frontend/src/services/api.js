import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1';

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return { error: error.response.data.error || 'Server Error' };
    } else {
      return { error: 'Cannot connect to backend' };
    }
  }
};
