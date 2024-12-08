import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { LayoutDashboard, Coins, ArrowUpRight, ArrowDownRight } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { state: expenseData } = useLocation();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (expenseData) {
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
        'rgba(99, 102, 241, 0.8)', // Indigo
        'rgba(244, 63, 94, 0.8)',  // Rose
        'rgba(234, 179, 8, 0.8)',  // Yellow
        'rgba(34, 197, 94, 0.8)',  // Green
        'rgba(168, 85, 247, 0.8)', // Purple
        'rgba(14, 165, 233, 0.8)', // Sky
      ];

      const borderColors = backgroundColors.map(color => color.replace('0.8', '1'));

      if (expenseData.home === 'own') {
        labels.shift();
        data.shift();
        backgroundColors.shift();
        borderColors.shift();
      }

      const chartConfig = {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        }],
      };
      setChartData(chartConfig);
    }
  }, [expenseData]);

  if (!chartData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const totalExpense = chartData.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
  const highestExpense = Math.max(...chartData.datasets[0].data);
  const lowestExpense = Math.min(...chartData.datasets[0].data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Expense Dashboard
              </h1>
              <p className="text-sm text-gray-500">{expenseData.month}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Coins className="w-5 h-5 text-indigo-600" />
            <span className="text-lg font-semibold text-gray-800">
              ₹{totalExpense.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              <div className="bg-green-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">Highest</span>
                </div>
                <p className="text-xl font-bold text-gray-800">
                  ₹{highestExpense.toLocaleString()}
                </p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-rose-600 mb-1">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-medium">Lowest</span>
                </div>
                <p className="text-xl font-bold text-gray-800">
                  ₹{lowestExpense.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Expense Details</h2>
              <div className="space-y-4">
                {chartData.labels.map((label, index) => {
                  const amount = chartData.datasets[0].data[index];
                  const percentage = ((amount / totalExpense) * 100).toFixed(1);
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                          />
                          <span className="text-sm font-medium text-gray-700">{label}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">₹{amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{percentage}%</div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-500 ease-in-out"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: chartData.datasets[0].backgroundColor[index]
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;