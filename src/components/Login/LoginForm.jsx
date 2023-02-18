import React, { useState } from "react";
import { LoginInputBase } from "./LoginInputBase";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../CreateAccount/CreateAccount";

export const LoginForm = () => {
  const [loginInputs, setLoginInputs] = useState({
    usernameInput: "",
    passwordInput: "",
  });
  const [errorM, setErrorM] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { usernameInput, passwordInput } = loginInputs;
    let registeredAccounts = {};
    await fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((accounts) => {
        for (const account of accounts) {
          registeredAccounts[account.username] = {
            username: account.username,
            password: account.password,
            id: account.id,
          };
        }
      })
      .catch((error) => console.error(error));
    let allClear = true;
    Object.keys(loginInputs).forEach((input) => {
      let errorText;
      switch (input) {
        case "usernameInput":
          if (usernameInput.length === 0) {
            errorText = "Please enter a username";
          } else if (!registeredAccounts[usernameInput]) {
            errorText = "This username does not exist";
          } else {
            errorText = "";
          }
          setErrorM((prevState) => ({
            ...prevState,
            usernameInputError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "passwordInput":
          if (
            registeredAccounts[usernameInput] &&
            registeredAccounts[usernameInput].password ===
              loginInputs.passwordInput
          ) {
            errorText = "";
          } else if (passwordInput.length === 0) {
            errorText = "Please enter a Password";
          } else {
            errorText = "Invalid Password";
          }
          setErrorM((prevState) => ({
            ...prevState,
            passwordInputError: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
        default:
          break;
      }
    });

    if (allClear) {
      localStorage.setItem(
        "loggedInAs",
        JSON.stringify(registeredAccounts[usernameInput])
      );
      navigate("/");
      window.location.reload();
    }
  };

  const updateLoginFields = ({ target: { name, value } }) => {
    setLoginInputs((prevState) => ({ ...prevState, [`${name}`]: value }));
  };

  const loginFields = [
    { label: "Username", name: "usernameInput", type: "text" },
    { label: "Password", name: "passwordInput", type: "password" },
  ];

  return (
    <div className="container loginFormPage">
      <h2 className="loginGreeting">Welcome to Gamerdise!</h2>
      <div className="loginSections">
        <div className="loginSection">
          <h2 className="formTitle">Log In</h2>
          <form onSubmit={handleLogin} className="loginForm">
            {loginFields.map((field) => (
              <LoginInputBase
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                onChange={updateLoginFields}
                errorM={
                  errorM[`${field.name}Error`] &&
                  errorM[`${field.name}Error`].length > 0
                    ? errorM[`${field.name}Error`]
                    : null
                }
              />
            ))}
            <button className="signInButton">Sign In</button>
          </form>
        </div>
        <div className="createAccountSection">
          <h2 className="formTitle">Create An Account</h2>
          <CreateAccount />
        </div>
      </div>
    </div>
  );
};
