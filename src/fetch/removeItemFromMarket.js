export const removeItemFromMarket = (id) => {
  return fetch(`http://localhost:3000/marketplaceItems/${id}`, {
    method: "DELETE",
  });
};
