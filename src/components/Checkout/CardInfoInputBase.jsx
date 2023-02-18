import React from "react";

export const CardInfoInputBase = ({
  label,
  name,
  type,
  value,
  errorM,
  selects,
  updateUserCartInfoInputs,
  maxLength,
}) => {
  switch (type) {
    case "multiSelect":
      return (
        <>
          <div className="cardInfoLabel">{label}</div>
          <div className="cardInfoSelectContainer">
            {selects.length > 0
              ? selects.map((select) => (
                  <div key={select.name}>
                    <div>{select.label}</div>
                    <select
                      name={select.name}
                      id={select.name}
                      onChange={(e) => updateUserCartInfoInputs(e)}
                    >
                      {select.selectOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              : null}
          </div>
          {errorM && <div className="cardInfoError">{errorM}</div>}
        </>
      );
    default:
      return (
        <div className="cardInfoInput">
          <div className="cardInfoLabel">{label}</div>
          <input
            type={type}
            name={name}
            value={value}
            maxLength={maxLength && maxLength}
            onChange={(e) => updateUserCartInfoInputs(e)}
          />
          {errorM && <div className="cardInfoError">{errorM}</div>}
        </div>
      );
  }
};
