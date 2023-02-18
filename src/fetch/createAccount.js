export const createAccount = (username, password) => {
  let newAccount = { username, password };
  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAccount),
  });
};
