import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { state: expenseData } = useLocation(); 
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (expenseData) {
      // Define the labels and data
      const labels = ['Rent', 'Food', 'Entertainment', 'Utilities', 'Personal', 'Others'];
      const data = [
        expenseData.rentAmount,
        expenseData.foodAmount,
        expenseData.entertainmentAmount,
        expenseData.utilitiesAmount,
        expenseData.personalAmount,
        expenseData.othersAmount,
      ];
      const backgroundColors = [
        'rgba(255, 99, 132, 0.2)', // Rent color
        'rgba(54, 162, 235, 0.2)', // Food color
        'rgba(255, 206, 86, 0.2)', // Entertainment color
        'rgba(75, 192, 192, 0.2)', // Utilities color
        'rgba(153, 102, 255, 0.2)', // Personal color
        'rgba(255, 159, 64, 0.2)', // Others color
      ];
      const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ];

      // If the home is "own", remove the Rent category
      if (expenseData.home === 'own') {
        labels.shift(); // Remove 'Rent' label
        data.shift();   // Remove Rent data
        backgroundColors.shift(); // Remove Rent color
        borderColors.shift();     // Remove Rent border color
      }

      const chartConfig = {
        labels: labels, // Labels will now dynamically change based on the home status
        datasets: [
          {
            label: 'Expense Breakdown',
            data: data, // Updated data array
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartConfig); // Set chart data to state
    }
  }, [expenseData]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div>
      <h2>Expense Breakdown for {expenseData.month}</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default Chart;
