import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import "./OnClickDisplayItem.css";

export const OnClickDisplayItem = () => {
  const { onClickDisplayItem } = useGamerdise();
  const { name, image, category, description, price, postedBy } =
    onClickDisplayItem;
  const infoTable = [
    { label: "Name:", value: name },
    { label: "Category:", value: category },
    { label: "Description:", value: description },
    { label: "Price:", value: `$${price}` },
    { label: "Posted By:", value: postedBy },
  ];

  return (
    <div className="onClickDisplayItem">
      <div className="displayImageWrapper">
        <img src={image} alt={name} />
      </div>
      <div className="infoTable">
        {infoTable.map((item) => (
          <div key={item.label} className="displayImageNameSection">
            <div className="pusher onDisplayItemLabel">{item.label}</div>
            <div className="onDisplayItemValue">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
