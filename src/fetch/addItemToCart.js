export const addItemToCart = ({ inCartForUser, marketplaceID }) => {
  return fetch("http://localhost:3000/userCartItems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inCartForUser: inCartForUser,
      marketplaceID: marketplaceID,
    }),
  });
};
