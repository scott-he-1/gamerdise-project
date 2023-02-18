import React from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";

export const CategoryFilterer = () => {
  const { marketItems, categoryFilter, setCategoryFilter } = useGamerdise();
  let categoriesAmount = {};
  for (let item of marketItems) {
    categoriesAmount[item.category]
      ? (categoriesAmount[item.category] += 1)
      : (categoriesAmount[item.category] = 1);
  }

  return (
    <>
      {Object.keys(categoriesAmount).map((category) => (
        <div
          key={category}
          className={`category ${categoryFilter === category ? "active" : ""}`}
          name={category}
          onClick={(e) => setCategoryFilter(e.target.getAttribute("name"))}
        >
          {category} ({categoriesAmount[category]})
        </div>
      ))}
    </>
  );
};
