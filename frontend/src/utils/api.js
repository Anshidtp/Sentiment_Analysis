import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function authenticate() {
  try {
    const response = await axios.post(`${API_BASE_URL}/token`);
    return response.data.access_token;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error(error.response?.data?.detail || "Authentication failed");
  }
}

export async function uploadFile(file, token) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file with token:", {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      hasToken: !!token
    });

    // Send token as query parameter
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

  } catch (error) {
    console.error("Upload error details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response?.data?.detail) {
      // Handle array of validation errors
      if (Array.isArray(error.response.data.detail)) {
        const errorMessage = error.response.data.detail
          .map(err => err.msg)
          .join(', ');
        throw new Error(errorMessage);
      }
      throw new Error(error.response.data.detail);
    }

    throw new Error(error.message);
  }
}