import React, { useState } from "react";
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
  const [selectedChart, setSelectedChart] = useState("Bar"); // State for chart selection

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
        data: Object.values(sentiments).map((count) => ((count / totalEntries) * 100).toFixed(2)),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // teal
          "rgba(255, 99, 132, 0.6)", // red
          "rgba(54, 162, 235, 0.6)", // blue
          "rgba(255, 206, 86, 0.6)", // yellow
          "rgba(153, 102, 255, 0.6)" // purple
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)"
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
        text: `Sentiment Distribution (${selectedChart} Chart)`
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
        beginAtZero: true
      }
    } : {}
  };

  return (
    <div className="p-4 flex flex-col md:flex-row items-start">
      {/* Dropdown to select chart type */}
      <div className="mb-6 md:mb-0 md:mr-6">
        <select
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </div>

      {/* Chart display */}
      <div className="flex-grow p-4 bg-white rounded shadow" style={{ width: "400px", height: "300px" }}>
        {selectedChart === "Bar" ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Pie data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default ChartDisplay;