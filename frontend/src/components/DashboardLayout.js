import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Nav from './Nav';
import FileUpload from './FileUpload';
import ChartDisplay from './ChartDisplay';
import LoadingSpinner from './LoadingSpinner';
import { uploadFile, authenticate } from '../utils/api';

const DashboardLayout = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const token = await authenticate();
      const data = await uploadFile(file, token);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Nav />
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Sentiment Analysis System
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your CSV file to analyze sentiment patterns and trends in your data
          </p>
        </motion.div>

        <FileUpload onFileUpload={handleFileUpload} />

        {loading && <LoadingSpinner />}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto p-4 bg-red-50 rounded-xl border border-red-100 flex items-center space-x-2"
          >
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-600">{error}</span>
          </motion.div>
        )}

        {results && <ChartDisplay data={results} />}
      </div>
    </div>
  );
};

export default DashboardLayout;