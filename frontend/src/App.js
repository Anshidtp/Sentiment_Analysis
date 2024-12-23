import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChartDisplay from "./components/ChartDisplay";
import { authenticate, uploadFile } from "./utils/api";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Authenticating...");
      const token = await authenticate();
      
      if (!token) {
        throw new Error("Failed to get authentication token");
      }
  
      console.log("Uploading file...");
      const data = await uploadFile(file, token);
      
      console.log("Upload successful:", data);
      setResults(data);
  
    } catch (error) {
      console.error("Error during upload:", error);
      setError(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Sentiment Analysis Portal</h1>
      
      <FileUpload onFileUpload={handleFileUpload} />
      
      {loading && (
        <div className="mt-4">
          <p>Processing file...</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {results && <ChartDisplay data={results} />}
    </div>
  );
}

export default App;