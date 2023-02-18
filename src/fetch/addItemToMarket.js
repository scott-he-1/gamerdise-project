export const addItemToMarket = ({
  name,
  description,
  category,
  price,
  image,
  postedBy,
  sellerID,
}) => {
  return fetch("http://localhost:3000/marketplaceItems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      image: image,
      category: category,
      price: price,
      postedBy: postedBy,
      sellerID: sellerID,
    }),
  });
};
