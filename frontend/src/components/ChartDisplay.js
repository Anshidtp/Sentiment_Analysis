// src/components/ChartDisplay.js
import React, { useState } from "react";
import { motion } from 'framer-motion';
import { BarChart3, PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartDisplay = ({ data }) => {
  const [selectedChart, setSelectedChart] = useState("Bar");

  // Calculate sentiment distribution
  const sentiments = data.reduce(
    (acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
      return acc;
    },
    {}
  );

  const totalEntries = data.length;

  // Chart configuration with percentages
  const chartData = {
    labels: Object.keys(sentiments),
    datasets: [
      {
        label: "Sentiment Distribution",
        data: Object.values(sentiments).map((count) => 
          ((count / totalEntries) * 100).toFixed(2)
        ),
        backgroundColor: [
          "rgba(139, 92, 246, 0.6)", // purple (matching theme)
          "rgba(236, 72, 153, 0.6)", // pink
          "rgba(99, 102, 241, 0.6)", // indigo
          "rgba(14, 165, 233, 0.6)", // sky
          "rgba(168, 85, 247, 0.6)"  // violet
        ],
        borderColor: [
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(99, 102, 241, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(168, 85, 247, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: `Sentiment Distribution (${selectedChart} Chart)`,
        font: {
          size: 16,
          family: "'Inter', sans-serif",
          weight: '600'
        },
        color: '#1f2937' // gray-800
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
    scales: selectedChart === "Bar" ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)' // Lighter grid lines
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      x: {
        grid: {
          display: false // Remove vertical grid lines
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif"
          }
        }
      }
    } : {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Chart Controls */}
        <div className="w-full md:w-auto flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Analysis Results
          </h3>
          <div className="relative">
            <select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="appearance-none bg-white border border-purple-200 rounded-lg py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="Bar">Bar Chart</option>
              <option value="Pie">Pie Chart</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              {selectedChart === "Bar" ? (
                <BarChart3 className="h-4 w-4" />
              ) : (
                <PieChart className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="w-full bg-white rounded-xl p-4" style={{ height: "400px" }}>
          {selectedChart === "Bar" ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <Pie data={chartData} options={chartOptions} />
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(sentiments).map(([sentiment, count]) => (
          <div
            key={sentiment}
            className="bg-purple-50 rounded-lg p-4 border border-purple-100"
          >
            <h4 className="text-sm font-medium text-purple-600 mb-1">
              {sentiment}
            </h4>
            <div className="text-2xl font-semibold text-gray-800">
              {((count / totalEntries) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">
              {count} entries
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChartDisplay;