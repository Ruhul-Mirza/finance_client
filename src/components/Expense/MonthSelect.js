import React from 'react';

const MonthSelect = ({ value, onChange }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <label htmlFor="months" className="block text-sm font-medium text-gray-700 mb-1">
        Select Month
      </label>
      <select
        id="months"
        name="months"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {months.map((month) => (
          <option key={month} value={month.toLowerCase()}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelect;
