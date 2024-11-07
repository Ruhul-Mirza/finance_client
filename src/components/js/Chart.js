import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const PieChart = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const reqData = await fetch("http://localhost:6999/chart");
        const resData = await reqData.json();
        console.log("API response:", resData);

        const eData = ["Home", "Rent", "Food", "Entertainment", "Utilities", "Personal", "Others"];
        const eAmount = [];

        // Use only the first expense object for each user
        if (resData.length > 0 && resData[0].expenses.length > 0) {
          const expense = resData[0].expenses[0];
          eAmount.push(
            expense.home || 0,
            expense.rentAmount || 0,
            expense.foodAmount || 0,
            expense.entertainmentAmount || 0,
            expense.utilitiesAmount || 0,
            expense.personalAmount || 0,
            expense.othersAmount || 0
          );
        }

        setExpenseData(eData);
        setExpenseAmount(eAmount);
        setIsDataLoaded(true);
        console.log("Expense labels:", eData);
        console.log("Expense amounts:", eAmount);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div>Chart</div>
      {isDataLoaded ? (
        <Chart
          type="pie"
          width={1349}
          height={550}
          series={expenseAmount}
          options={{
            title: {
              text: "Expense Pie Chart "
            },
            noData: {
              text: "No Data Available"
            },
            labels: expenseData
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PieChart;
