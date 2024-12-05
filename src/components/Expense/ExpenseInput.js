import React from 'react';

const ExpenseInput = ({
  icon,
  name,
  label,
  value,
  onChange,
  error,
  placeholder
}) => {
  return (
    <div className="group">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors">
        {label}
      </label>
      <div className="relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-hover:text-indigo-500">
          {icon}
        </div>
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border rounded-xl focus:ring-2 focus:ring-offset-0 transition-all duration-200 ${
            error 
              ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
              : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500 group-hover:border-indigo-300'
          }`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default ExpenseInput;
