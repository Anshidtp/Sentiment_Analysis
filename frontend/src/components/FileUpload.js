import React, { useRef } from "react";

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef();

  const validateFile = (file) => {
    // Check if file exists
    if (!file) {
      throw new Error("No file selected");
    }

    // Check file extension
    if (!file.name.toLowerCase().endsWith('.csv')) {
      throw new Error("Please select a CSV file");
    }

    // Check file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File size must be less than 5MB");
    }

    // Check if file is empty
    if (file.size === 0) {
      throw new Error("File is empty");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    try {
      validateFile(file);
      console.log("File validation passed:", {
        name: file.name,
        type: file.type,
        size: file.size
      });
      await onFileUpload(file);
    } catch (error) {
      console.error("File validation failed:", error);
      alert(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", {
        name: file.name,
        type: file.type,
        size: file.size
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <div className="text-sm text-gray-600">
          Accepted file type: CSV (*.csv)
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default FileUpload;