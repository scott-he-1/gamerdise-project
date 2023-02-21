import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsersItems } from "../fetch/getUserItems";
import { getUserNotifications } from "../fetch/getUserNotifications";
import { removeItemFromCart } from "../fetch/removeItemFromCart";
import { removeItemFromMarket } from "../fetch/removeItemFromMarket";
import { fetchRemoveNotification } from "../fetch/removeNotifcation";
import { sendNotificationToUser } from "../fetch/sendNotificationToUser";

const GamerdiseContext = createContext({});

export const GamerdiseProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [marketItems, setMarketItems] = useState([]);
  const [userCartItems, setUserCartItems] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchInputFilter, setSearchInputFilter] = useState("");
  const [onClickDisplayItem, setOnClickDisplayItem] = useState(null);

  const loggedIn = localStorage.getItem("loggedInAs");
  const currentAccount = JSON.parse(loggedIn);
  const currentAccountID = currentAccount ? currentAccount.id : null;

  const reFetchMarketItems = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/marketplaceItems")
      .then((response) => response.json())
      .then(setMarketItems)
      .catch((error) => {
        setIsErrorLoading(true);
        console.error(error);
      })
      .finally(setIsLoading(false));
  };

  const reFetchUserItems = () => {
    getUsersItems()
      .then((response) => response.json())
      .then((cartItems) => setUserCartItems(cartItems))
      .catch((error) => console.error(error));
  };

  const reFetchUserNotifications = () => {
    getUserNotifications()
      .then((response) => response.json())
      .then((notifications) => setUserNotifications(notifications))
      .catch((error) => console.error(error));
  };

  const removeCartItem = (notificationID) => {
    removeItemFromCart(notificationID)
      .then(() => reFetchUserItems())
      .catch((error) => console.error(error));
  };

  const removeMarketItem = (id, nameOfItem) => {
    removeItemFromMarket(id)
      .then(async () => {
        const IDsOfUsersToMessage = userCartItems
          .filter((item) => item.marketplaceID === Number(id))
          .map((cartItem) => cartItem.inCartForUser);

        const IDsOfCartItemsToRemove = userCartItems
          .filter((item) => item.marketplaceID === Number(id))
          .map((cartItem) => cartItem.id);

        for (let userID of IDsOfUsersToMessage) {
          let message =
            currentAccountID === userID
              ? `You just removed your item: ${nameOfItem}, from the market`
              : `Seller removed item: ${nameOfItem} from the market, item was removed from your cart.`;
          await sendNotificationToUser(userID, message);
        }

        for (let cartItemID of IDsOfCartItemsToRemove) {
          await removeItemFromCart(cartItemID);
        }
        reFetchMarketItems();
        reFetchUserItems();
        reFetchUserNotifications();
      })
      .catch((error) => console.error(error));
  };

  const removeNotification = (e) => {
    fetchRemoveNotification(e.target.id).then(() => reFetchUserNotifications());
  };

  const purchaseItem = async (id, nameOfItem) => {
    await removeItemFromMarket(id)
      .then(async () => {
        const IDsOfUsersToMessage = userCartItems
          .filter((item) => item.marketplaceID === Number(id))
          .map((cartItem) => cartItem.inCartForUser);

        const IDsOfCartItemsToRemove = userCartItems
          .filter((item) => item.marketplaceID === Number(id))
          .map((cartItem) => cartItem.id);

        for (let userID of IDsOfUsersToMessage) {
          let message =
            currentAccountID === userID
              ? `You just bought: ${nameOfItem}`
              : `Someone bought the item: ${nameOfItem} from the market, item was removed from your cart.`;
          await sendNotificationToUser(userID, message);
        }

        for (let cartItemID of IDsOfCartItemsToRemove) {
          await removeItemFromCart(cartItemID);
        }
        reFetchMarketItems();
        reFetchUserItems();
        reFetchUserNotifications();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    reFetchMarketItems();
    if (localStorage.getItem("loggedInAs")) {
      reFetchUserItems();
      reFetchUserNotifications();
    }
  }, []);

  return (
    <GamerdiseContext.Provider
      value={{
        isLoading,
        isErrorLoading,
        loggedIn,
        currentAccount,
        currentAccountID,
        marketItems,
        categoryFilter,
        setCategoryFilter,
        searchInputFilter,
        setSearchInputFilter,
        reFetchMarketItems,
        userCartItems,
        onClickDisplayItem,
        setOnClickDisplayItem,
        removeCartItem,
        removeMarketItem,
        reFetchUserItems,
        purchaseItem,
        userNotifications,
        removeNotification,
      }}
    >
      {children}
    </GamerdiseContext.Provider>
  );
};

export const useGamerdise = () => {
  const context = useContext(GamerdiseContext);
  return {
    isLoading: context.isLoading,
    isErrorLoading: context.isErrorLoading,
    loggedIn: context.loggedIn,
    currentAccount: context.currentAccount,
    currentAccountID: context.currentAccountID,
    marketItems: context.marketItems,
    categoryFilter: context.categoryFilter,
    setCategoryFilter: context.setCategoryFilter,
    searchInputFilter: context.searchInputFilter,
    setSearchInputFilter: context.setSearchInputFilter,
    reFetchMarketItems: context.reFetchMarketItems,
    userCartItems: context.userCartItems,
    onClickDisplayItem: context.onClickDisplayItem,
    setOnClickDisplayItem: context.setOnClickDisplayItem,
    removeCartItem: context.removeCartItem,
    removeMarketItem: context.removeMarketItem,
    reFetchUserItems: context.reFetchUserItems,
    purchaseItem: context.purchaseItem,
    userNotifications: context.userNotifications,
    removeNotification: context.removeNotification,
  };
};
