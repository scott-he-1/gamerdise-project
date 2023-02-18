import React, { useState } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { ItemDisplayCard } from "./ItemDisplayCard";
import "./HomePage.css";
import { SearchBar } from "./Searchbar";
import { CategoryFilterer } from "./CategoryFilterer";
import { OnClickDisplayItem } from "./onClickDisplayItem";
import { addItemToCart } from "../../fetch/addItemToCart";

export const HomePage = () => {
  const {
    isLoading,
    isErrorLoading,
    marketItems,
    categoryFilter,
    searchInputFilter,
    setCategoryFilter,
    onClickDisplayItem,
    setOnClickDisplayItem,
    removeMarketItem,
    reFetchUserItems,
    userCartItems,
  } = useGamerdise();
  const loggedInInfo = localStorage.getItem("loggedInAs");
  const loggedInUsername = loggedInInfo
    ? JSON.parse(loggedInInfo).username
    : null;
  const loggedInID = loggedInInfo ? JSON.parse(loggedInInfo).id : null;

  const addToCart = (itemID) => {
    addItemToCart({
      inCartForUser: loggedInID,
      marketplaceID: itemID,
    })
      .then(reFetchUserItems())
      .catch((error) => console.error(error));
  };

  const marketItemsSection = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isErrorLoading) {
      return <div>Error loading items</div>;
    } else {
      return marketItems
        .filter(
          (item) =>
            item.category.includes(categoryFilter) &&
            item.name
              .split(" ")
              .join("")
              .match(new RegExp(searchInputFilter, "gi"))
        )
        .map((item) => {
          return (
            <ItemDisplayCard
              key={item.id}
              id={item.id}
              description={item.description}
              category={item.category}
              image={item.image}
              name={item.name}
              alreadyInCart={
                userCartItems.find(
                  (cartItem) =>
                    cartItem.marketplaceID === item.id &&
                    cartItem.inCartForUser === loggedInID
                )
                  ? true
                  : false
              }
              postedBy={item.postedBy}
              price={item.price}
              addToCart={addToCart}
              removeMarketItem={removeMarketItem}
              loggedInUsername={loggedInUsername}
            />
          );
        });
    }
  };

  const removeShowItem = (e) => {
    if (e.target.classList.value === "pageCover") {
      setOnClickDisplayItem(null);
    }
  };

  return (
    <div className="homePage">
      {onClickDisplayItem !== null && (
        <div className="pageCover" onClick={removeShowItem}>
          <OnClickDisplayItem />
        </div>
      )}
      {loggedInUsername && (
        <div className="greeting">Welcome, {loggedInUsername}!</div>
      )}
      <SearchBar />
      <div className="container marketItemsMainDisplay">
        <div className="categoriesFilterSection">
          {categoryFilter.length > 0 && (
            <button
              onClick={() => setCategoryFilter("")}
              className="filterClearer"
            >
              Clear Your Filter
            </button>
          )}
          <div className="header-2">Categories</div>
          <CategoryFilterer />
        </div>
        <div className="marketItemsSection">{marketItemsSection()}</div>
      </div>
    </div>
  );
};
