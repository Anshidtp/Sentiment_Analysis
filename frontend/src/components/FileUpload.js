import React from 'react';
import { motion } from 'framer-motion';
import { Upload, ChartBar } from 'lucide-react';

const FileUpload = ({ onFileUpload }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target.elements.file.files[0];
    if (file) onFileUpload(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto mb-12"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-6">
            <Upload className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Upload Your File
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Drag and drop your CSV file here or click to browse
          </p>
          <input
            name="file"
            type="file"
            accept=".csv"
            className="block w-full text-sm text-gray-600
            file:mr-4 file:py-3 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-purple-600 file:text-white
            hover:file:bg-purple-700
            file:cursor-pointer file:transition-colors"
          />
          <button 
            type="submit"
            className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg shadow-purple-200"
          >
            <ChartBar className="h-5 w-5" />
            <span>Analyze Data</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default FileUpload;