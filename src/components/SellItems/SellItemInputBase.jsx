import React from "react";

export const SellItemInputBase = ({
  name,
  label,
  type,
  value,
  selectOptions,
  updateInputFields,
  specialSymbol,
  errorM,
}) => {
  const Input = (type) => {
    switch (type) {
      case "select":
        return (
          <select name={name} id={name} onChange={updateInputFields}>
            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textArea":
        return (
          <textarea
            name={name}
            id={name}
            cols="30"
            rows="10"
            style={{ resize: "none" }}
            value={value}
            onChange={updateInputFields}
          ></textarea>
        );

      default:
        return (
          <div className="inputContainer">
            {specialSymbol && specialSymbol}
            <input
              type="text"
              name={name}
              onChange={updateInputFields}
              value={value}
            />
          </div>
        );
    }
  };

  return (
    <div className="itemInputField">
      <h3>{label}</h3>
      {Input(type)}
      {errorM && <div className="sellItemInputErrorM">{errorM}</div>}
    </div>
  );
};
