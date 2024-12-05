import React from 'react';

const InputField = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  endIcon
}) => {
  return (
    <div className="relative rounded-lg">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
      {endIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default InputField;
