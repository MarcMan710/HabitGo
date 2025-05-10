import React from 'react';

const InputField = ({ label, type, name, value, onChange, error, ...props }) => {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        }`}
        {...props} // Spread remaining props here
      />
      {error && <p id={errorId} className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
