import React, { useState } from "react";
import { createAccount } from "../../fetch/createAccount";
import { LoginInputBase } from "../Login/LoginInputBase";

const INIT_CREATE_ACCOUNT_INPUTS = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const CreateAccount = () => {
  const [createAccountInputs, setCreateAccountInputs] = useState(
    INIT_CREATE_ACCOUNT_INPUTS
  );
  const [errorM, setErrorM] = useState({});
  const [hidePassword, setHidePassword] = useState(true);

  const updateInputFields = ({ target: { name, value } }) => {
    setCreateAccountInputs((prevState) => ({
      ...prevState,
      [`${name}`]: value,
    }));
  };

  const submitNewAccount = async (e) => {
    e.preventDefault();
    let takenUsers = await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .catch((error) => console.error(error));

    const { username, password, confirmPassword } = createAccountInputs;
    let allClear = true;
    Object.keys(createAccountInputs).forEach((input) => {
      let errorText = "";
      switch (input) {
        case "username":
          if (username.length <= 0) {
            errorText = "Please enter a username";
          } else if (
            takenUsers.map((user) => user.username).includes(username)
          ) {
            errorText = "Username already taken";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            usernameError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "password":
          if (password.length <= 0) {
            errorText = "Please enter a password";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            passwordError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "confirmPassword":
          if (password !== confirmPassword) {
            errorText = "Passwords must match";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            confirmPasswordError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        default:
          break;
      }
    });

    if (allClear) {
      createAccount(username, password)
        .then(() => alert("Successfully created new account!"))
        .catch(() =>
          alert("There was a problem creating a new account, please try again")
        );
      setCreateAccountInputs(INIT_CREATE_ACCOUNT_INPUTS);
    }
  };

  const createAccountFields = [
    { label: "Username", name: "username", type: "text" },
    {
      label: "Password",
      name: "password",
      type: hidePassword ? "password" : "text",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: hidePassword ? "password" : "text",
    },
  ];

  return (
    <div>
      <form onSubmit={submitNewAccount}>
        {createAccountFields.map((field) => (
          <LoginInputBase
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={createAccountInputs[field.name]}
            onChange={updateInputFields}
            errorM={
              errorM[`${field.name}Error`] &&
              errorM[`${field.name}Error`].length > 0
                ? errorM[`${field.name}Error`]
                : null
            }
          />
        ))}
        <button className="signInButton">Create Account</button>
      </form>
    </div>
  );
};
