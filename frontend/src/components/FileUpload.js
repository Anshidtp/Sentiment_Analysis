import React, { useRef } from "react";

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef();

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      console.log("File selected:", file.name);
      onFileUpload(file);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} accept=".csv" />
      <button onClick={handleFileChange}>Upload</button>
    </div>
  );
};

export default FileUpload;