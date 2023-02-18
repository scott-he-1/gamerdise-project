export const getUsersItems = async () => {
  return await fetch(`http://localhost:3000/userCartItems`);
};
