import React from "react";

export const AddressInfoInputBase = ({
  label,
  name,
  type,
  value,
  errorM,
  selectOptions,
  updateAddressInfoInputs,
}) => {
  switch (type) {
    case "select":
      return (
        <div>
          <div className="addressInfoLabel">{label}</div>
          <select
            name={name}
            id={name}
            onChange={(e) => updateAddressInfoInputs(e)}
          >
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errorM && <div className="addressInputErrorM">{errorM}</div>}
        </div>
      );
    default:
      return (
        <div>
          <div className="addressInfoLabel">{label}</div>
          <input
            type={type}
            name={name}
            onChange={(e) => updateAddressInfoInputs(e)}
            value={value}
          />
          {errorM && <div className="addressInputErrorM">{errorM}</div>}
        </div>
      );
  }
};
