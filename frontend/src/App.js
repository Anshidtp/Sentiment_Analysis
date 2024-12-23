import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChartDisplay from "./components/ChartDisplay";
import { authenticate, uploadFile } from "./utils/api";

function App() {
  const [results, setResults] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      const token = await authenticate();
      const data = await uploadFile(file, token);
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload file. Ensure the file is a CSV.");
    }
  };

  return (
    <div className="App">
      <h1>Sentiment Analysis Portal</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {results && <ChartDisplay data={results} />}
    </div>
  );
}

export default App;