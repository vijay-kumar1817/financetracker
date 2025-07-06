// import React from 'react';



// import React from 'react';

// const ExpenseChart = ({ categoryTotals }) => (
//   <div className="chart-box">
//     <h3>Expense Charts</h3>
//     <ul>
//       {Object.entries(categoryTotals).map(([category, amount]) => (
//         <li key={category}>{category}: ₹{amount}</li>
//       ))}
//     </ul>
//   </div>
// );

// export default ExpenseChart;

import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ categoryTotals, dailyExpenses, timeRange, setTimeRange }) => {
  const [view, setView] = useState('category');

  const categoryLabels = Object.keys(categoryTotals);
  const categoryData = Object.values(categoryTotals);

  const dateLabels = Object.keys(dailyExpenses);
  const dateData = Object.values(dailyExpenses);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: view === 'category' ? 'Expenses by Category' : 'Expenses by Date',
      },
    },
  };

  return (
    <div className="chart-box">
      <h3>Expense Analysis</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button onClick={() => setView('category')} style={{ fontWeight: view === 'category' ? 'bold' : 'normal' }}>By Category</button>
          <button onClick={() => setView('date')} style={{ fontWeight: view === 'date' ? 'bold' : 'normal' }}>By Date</button>
        </div>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {view === 'category' ? (
        <Pie
          data={{
            labels: categoryLabels,
            datasets: [
              {
                label: '₹',
                data: categoryData,
                backgroundColor: [
                  '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0', '#03A9F4'
                ],
              },
            ],
          }}
          options={options}
        />
      ) : (
        <Bar
          data={{
            labels: dateLabels,
            datasets: [
              {
                label: 'Daily Expenses',
                data: dateData,
                backgroundColor: '#36A2EB',
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default ExpenseChart;
