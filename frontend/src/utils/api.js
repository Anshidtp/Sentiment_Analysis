import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function authenticate() {
  const response = await axios.post(`${API_BASE_URL}/token`);
  return response.data.access_token;
}

export async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  console.log("Uploading file:", file.name);
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}