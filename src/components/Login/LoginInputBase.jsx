import React from "react";
import "./LoginInputBase.css";

export const LoginInputBase = ({
  label,
  name,
  type,
  errorM,
  onChange,
  value,
}) => {
  return (
    <div className="loginInputBase">
      <div className="loginLabel">{label}</div>
      <input
        className="loginInput"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={30}
      />
      {errorM && <div className="loginErrorM">{errorM}</div>}
    </div>
  );
};
