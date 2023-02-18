import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./MiniCartItem.css";
import React from "react";

export const MiniCartItem = ({ name, id, image, price, removeCartItem }) => {
  return (
    <div className="miniCartItem">
      <FontAwesomeIcon
        icon={faCircleXmark}
        id={id}
        onClick={(e) => removeCartItem(e.target.id)}
      />
      <div className="miniCartImageWrapper">
        <img src={image} alt={name} />
      </div>
      <div className="miniCartItemInfo">
        <div>{name}</div>
        <div>${price.toFixed(2)}</div>
      </div>
    </div>
  );
};
