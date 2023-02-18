import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./ItemDisplayCard.css";

export const ItemDisplayCard = ({
  category,
  image,
  name,
  postedBy,
  price,
  id,
  addToCart,
  alreadyInCart,
  description,
  removeMarketItem,
  loggedInUsername,
}) => {
  const { setOnClickDisplayItem } = useGamerdise();
  const itemInfo = {
    category: category,
    image: image,
    name: name,
    postedBy: postedBy,
    price: price,
    description: description,
  };

  const currentButtonText = () => {
    if (!loggedInUsername) {
      return "Please Login To Buy";
    } else if (alreadyInCart) {
      return "Already In Cart";
    } else if (postedBy === loggedInUsername) {
      return "Remove This Item";
    } else {
      return "Add To Cart";
    }
  };

  const buttonDisabled = () => {
    if (!loggedInUsername) {
      return true;
    } else if (alreadyInCart) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="itemCardAllInfo">
      <div className="itemCardSeller">
        Seller: {loggedInUsername === postedBy ? "YOU" : postedBy}
      </div>
      <div className="itemDisplayCard">
        <div
          className="clickAbleSection"
          onClick={() => setOnClickDisplayItem(itemInfo)}
        >
          <div className="itemImageWrapper">
            <img
              src={image}
              alt={name}
              onClick={() => setOnClickDisplayItem(itemInfo)}
            />
          </div>
          <div
            className="cardCategory"
            onClick={() => setOnClickDisplayItem(itemInfo)}
          >
            {category}
          </div>
          <div
            className="cardName"
            onClick={() => setOnClickDisplayItem(itemInfo)}
          >
            {name}
          </div>
          <div
            className="cardPrice"
            onClick={() => setOnClickDisplayItem(itemInfo)}
          >
            {price === 0 ? "FREE" : `$${price.toFixed(2)}`}
          </div>
        </div>
        <button
          className={`cardButton ${
            postedBy === loggedInUsername ? "remove" : ""
          }`}
          disabled={buttonDisabled()}
          id={id}
          onClick={(e) =>
            postedBy === loggedInUsername
              ? removeMarketItem(e.target.id, name)
              : addToCart(Number(e.target.id))
          }
        >
          {currentButtonText()}
        </button>
      </div>
    </div>
  );
};
