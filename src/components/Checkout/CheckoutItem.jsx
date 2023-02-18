import React from "react";
import "./CheckoutItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const CheckoutItem = ({
  name,
  image,
  category,
  price,
  id,
  removeCartItem,
}) => {
  return (
    <div className="checkoutItem">
      <FontAwesomeIcon
        icon={faCircleXmark}
        id={id}
        onClick={(e) => removeCartItem(e.target.id)}
      />
      <div className="checkoutItemImageWrapper">
        <img src={image} alt={name} />
      </div>
      <div className="checkoutItemInfo">
        <div className="checkoutInfoCategory">{category}</div>
        <div className="checkoutInfoName">{name}</div>
        <div className="checkoutInfoPrice">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};
