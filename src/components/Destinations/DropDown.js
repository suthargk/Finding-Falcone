import React from "react";

const DropDown = ({ value, handleOnSelect, options, destination }) => {
  return (
    <div className="destinations_list-item-box-dropdown">
      <div className="destinations_list-item-box-title">
        {destination.destinationName}
      </div>
      <select
        className="destination_list-item-box-select"
        value={value}
        onChange={handleOnSelect}
      >
        <option value="">Select Planet</option>
        {value && <option value={value}>{value}</option>}
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  );
};

export default DropDown;
