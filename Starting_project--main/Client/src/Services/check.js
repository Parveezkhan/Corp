import React, { useState } from "react";
import "../styles/check.css"; // We'll define styles here.

const DropdownChecklistWithSearch = () => {
  const options = [
    { label: "EC2", value: "EC2" },
    { label: "RDS", value: "RDS" },
    { label: "Dynamo DB", value: "Dynamo DB" },
    { label: "IAM", value: "IAM" },
    { label: "Sequirty hub", value: "Sequirty hub" },
    { label: "Elastic cache", value: "Elastic cache" },
    { label: "Lambda", value: "Lambda" },
    { label: "Elastic benstalk", value: "Elastic benstalk" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle the checkbox change
  const handleCheckboxChange = (e, value) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    }
  };

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-header w-100"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        Select Intances ({selectedOptions.length})
      </div>

      {dropdownOpen && (
        <div className="dropdown-list">
          {/* Search Input */}
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Checkboxes */}
          <div className="checkbox-list">
            {filteredOptions.map((option) => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={(e) => handleCheckboxChange(e, option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownChecklistWithSearch;