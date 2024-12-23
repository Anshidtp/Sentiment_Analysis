import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const ChartDisplay = ({ data }) => {
  const sentiments = data.reduce(
    (acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = {
    labels: Object.keys(sentiments),
    datasets: [
      {
        label: "Sentiment Distribution",
        data: Object.values(sentiments),
        backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0"],
      },
    ],
  };

  return (
    <div>
      <h2>Sentiment Analysis Results</h2>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Bar data={chartData} />
      </div>
      <div style={{ width: "50%", margin: "20px auto" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ChartDisplay;