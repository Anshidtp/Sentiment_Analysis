import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export async function authenticate() {
  const response = await axios.post(`${API_BASE_URL}/token`);
  return response.data.access_token;
}

export async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(
    `${API_BASE_URL}/upload?token=${token}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  
  return response.data;
}