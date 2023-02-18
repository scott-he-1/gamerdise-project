export const removeItemFromCart = (id) => {
  return fetch(`http://localhost:3000/userCartItems/${id}`, {
    method: "DELETE",
  });
};
